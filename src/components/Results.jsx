import Button from "./Button";
import Envelope from "../assets/images/envelope.svg";
function Results({ results }) {
  const OUT_OF_STOCK_STYLES = "bg-red-500";
  const IN_STOCK_STYLES = "bg-green-500";

  return (
    <section className="text-white">
      {results.map((result, index) => (
        <article
          key={index}
          className="grid grid-cols-2 gap-4 mt-4 p-4 bg-slate-900 rounded-xl"
        >
          <div>
            <img
              className="aspect-video rounded-xl mx-auto"
              src={result.productImage}
              alt={result.productName}
            />
          </div>
          <div className="flex flex-col justify-evenly">
            <h2 className="text-3xl font-bold">{result.productName}</h2>
            <p className="text-2xl">{result.productPrice}</p>
            <div className="flex gap-4">
              <h4
                className={`text-xl p-2 w-fit rounded-xl font-bold  ${
                  result.hasStock ? IN_STOCK_STYLES : OUT_OF_STOCK_STYLES
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              >
                {result.hasStock ? "In Stock" : "Out of Stock"}
              </h4>
              {result.hasStock === false && (
                <Button>
                  <span className="text-xl">Notify Me</span>
                  <img src={Envelope} alt="Send Message" className="size-4" />
                </Button>
              )}
            </div>
          </div>
          {/* <h1>{result.hasStock ? "In Stock" : "Out of Stock"}</h1>
          <h2>{result.productName}</h2>
          <img src={result.productImage} alt={result.productName} />
          <h2>{result.hasStock ? "In Stock" : "Out of Stock"}</h2>
          <p>{result.productPrice}</p> */}
        </article>
      ))}
    </section>
  );
}
export default Results;
