import Button from "./Button";
import Envelope from "../assets/images/envelope.svg";
import { useState } from "react";
import ModalForm from "./ModalForm";
function Results({ results }) {
  const OUT_OF_STOCK_STYLES = "bg-red-500";
  const IN_STOCK_STYLES = "bg-green-500";

  const MONTHS_DICTIONARY = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const currentYear = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();

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
            <div className="flex gap-4 items-center">
              <h4
                className={`text-xl flex items-center p-3 w-fit rounded-xl font-bold  ${
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
              <span className="text-gray-400">
                <i>
                  {`Updated on ${MONTHS_DICTIONARY[month]} ${day}, ${currentYear} at ${hour}:${minutes}`}
                </i>
              </span>
            </div>
          </div>
        </article>
      ))}
      <ModalForm open={open} setOpen={setOpen} />
    </section>
  );
}
export default Results;
