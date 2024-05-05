import express from "express";
import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import cors from "cors";
const app = express();
app.use(cors());

const PORT = process.env.REACT_APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/products/q=:productURL", async (req, res) => {
  const productURL = decodeURIComponent(req.params.productURL);
  console.log(productURL);

  const shops = [
    {
      vendor: "Best Buy",
      url: `${productURL}`,
      checkStock: async ({ page }) => {
        const productName = await page.textContent(".sku-title");
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
  const results = [];

  for (const shop of shops) {
    const { checkStock, vendor, url } = shop;
    const page = await browser.newPage();
    await page.goto(url);
    const result = await checkStock({ page, url });
    results.push({ vendor, ...result });
  }
  console.log("done");
  await browser.close();
  if (results.length > 0) {
    res.status(200).json(results);
  } else {
    res.status(404).json({ message: "No results found" });
  }
});
