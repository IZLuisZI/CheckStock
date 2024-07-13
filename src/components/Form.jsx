import React from "react";
import SearchIcon from "../assets/images/search.svg";
import Button from "./Button";
import useFetchSubmit from "../hooks/useFetchSubmit";
import Results from "./Results";
import Paste from "../assets/images/paste.svg";
import ProductLoad from "./ProductLoad";
import Spinner from "../assets/images/spinner.svg";

function Form() {
  const { data, loading, inputValue, submit, handleChange, handleSubmit } =
    useFetchSubmit();

  const dataArray = Array.isArray(data) ? data : [data];

  const handleclick = (e) => {
    e.preventDefault();
    navigator.clipboard.readText().then((text) => {
      handleChange({ target: { value: text } });
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" flex items-center mt-12 py-2 px-4 bg-gray-300 rounded-2xl"
      >
        <div>
          <img src={SearchIcon} alt="search Icon" className="size-6" />
        </div>
        <label htmlFor="search" className="flex-1">
          <input
            id="search"
            className="p-2 outline-none border-none bg-transparent w-full text-lg"
            type="text"
            placeholder="Paste the product URL here"
            autoComplete="off"
            value={inputValue}
            onChange={handleChange}
          />
        </label>
        <div className="flex gap-2 items-center">
          <button
            id="paste"
            onClick={(e) => handleclick(e)}
            title="Paste url"
            className="ring-1 bg-gray-300 ring-gray-400 rounded-md h-1/2 grid place-items-center"
          >
            <img src={Paste} className="size-6" alt="Paste Url" />
          </button>
          <Button disabled={loading}>Search</Button>
        </div>
      </form>
      {submit === false && (
        <ProductLoad>
          {" "}
          Please enter a valid URL to search{" "}
          <span role="img" aria-label="search">
            🔍
          </span>
        </ProductLoad>
      )}
      {loading && (
        <ProductLoad>
          {" "}
          Loading{" "}
          <span role="img" aria-label="loading">
            <img id="spinner" src={Spinner} alt="loading" className="size-4" />
          </span>
        </ProductLoad>
      )}
      {data && <Results results={dataArray} />}
    </>
  );
}

export default Form;
