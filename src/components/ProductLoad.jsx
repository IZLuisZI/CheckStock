function ProductLoad({ children }) {
  return (
    <div>
      <div className=" text-black font-bold mt-3 rounded-xl p-3  bg-yellow-200">
        <h2 className="mr-2 flex items-center gap-2">{children} </h2>
      </div>
    </div>
  );
}
export default ProductLoad;
