import express from "express";
import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import cors from "cors";

interface Shop {
  vendor: string;
  url: string;
  checkStock: (context: { page: any; url: string }) => Promise<any>;
}

const allowedOrigins = ["http://www.luissoriano.dev", "https://localhost:5173"];

const app = express();
app.use(cors());

const PORT = process.env.REACT_APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/products/q=:productURL", async (req, res) => {
  const productURL = decodeURIComponent(req.params.productURL);
  console.log("Checking product:", productURL);

  const shops: Shop[] = [
    {
      vendor: "Best Buy",
      url: `${productURL}`,
      checkStock: async ({ page }) => {
        // Inside the checkStock function
        try {
          // Wait for the .us-link element to appear, but don't wait longer than a specific timeout.
          // This prevents the script from hanging indefinitely if the element doesn't exist.
          await page.waitForSelector(".us-link", { timeout: 5000 }); // Wait for up to 5 seconds
          const gate = await page.textContent(".us-link");
          if (gate) {
            setTimeout(async () => {
              await page.click(".us-link");
            }, 1234);
          }
        } catch (error) {
          // If the element isn't found within the timeout, log the error and proceed.
          // This catch block will handle the TimeoutError specifically.
          console.log(".us-link not found or other error:", error);
        }

        // Continue with the rest of your function...
        const productName = await page.textContent(".sku-title h1");
        const productPrice = await page.textContent(
          ".priceView-hero-price.priceView-customer-price span"
        );
        const productImage = await page.getAttribute(".primary-image", "src");

        const content = await page.textContent(".add-to-cart-button");
        const hasStock = content.includes("Sold Out") === false;
        return { productName, hasStock, productPrice, productImage };
      },
    },
  ];

  chromium.use(StealthPlugin());
  const browser = await chromium.launch({ headless: true });
  const results: any[] = [];

  for (const shop of shops) {
    const { checkStock, vendor, url } = shop;
    const page = await browser.newPage();
    await page.goto(url);
    const result = await checkStock({ page, url } as {
      page: any;
      url: string;
    });
    results.push({ vendor, ...result });
  }
  console.log(results);
  console.log("done");
  await browser.close();
  if (results.length > 0) {
    res.status(200).json(results);
  } else {
    res.status(404).json({ message: "No results found" });
  }
});
