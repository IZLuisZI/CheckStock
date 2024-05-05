import Button from "./Button";
import Envelope from "../assets/images/envelope.svg";
import { useState } from "react";
import ModalForm from "./ModalForm";
function Results({ results }) {
  const OUT_OF_STOCK_STYLES = "bg-red-500";
  const IN_STOCK_STYLES = "bg-green-500";

  const [open, setOpen] = useState(false);

  return (
    <section className="text-white">
      {results.map((result, index) => (
        <article
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 px-4 py-8 bg-slate-900 rounded-xl"
        >
          <div>
            <img
              className="aspect-auto rounded-xl mx-auto max-h-72"
              src={result.productImage}
              alt={result.productName}
            />
          </div>
          <div className="flex flex-col gap-4 justify-evenly">
            <h2 className="text-3xl font-bold">{result.productName}</h2>
            <p className="text-2xl">{result.productPrice}</p>
            <div className="flex gap-4">
              <h4
                className={`text-xl flex items-center p-2 w-fit rounded-xl font-bold  ${
                  result.hasStock ? IN_STOCK_STYLES : OUT_OF_STOCK_STYLES
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              >
                {result.hasStock ? "In Stock" : "Out of Stock"}
              </h4>
              {result.hasStock === false && (
                <div onClick={() => setOpen(true)}>
                  <Button>
                    <span className="text-xl">Notify Me</span>
                    <img src={Envelope} alt="Send Message" className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
      <ModalForm open={open} setOpen={setOpen} />
    </section>
  );
}
export default Results;
