import Spinner from "../assets/images/spinner.svg";
function ProductLoad({ loadState }) {
  return (
    <div>
      {loadState ? (
        <div className="flex items-center text-black font-bold mt-3 rounded-xl p-3  bg-yellow-200">
          <h2 className="mr-2">Loading </h2>
          <span role="img" aria-label="loading">
            <img id="spinner" src={Spinner} alt="loading" className="size-4" />
          </span>
        </div>
      ) : null}
    </div>
  );
}
export default ProductLoad;
