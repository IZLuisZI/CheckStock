import React from "react";
import SearchIcon from "../assets/images/search.svg";
import Button from "./Button";
import useFetchSubmit from "../hooks/useFetchSubmit";
import Results from "./Results";
import { useEffect } from "react";
import ProductLoad from "./ProductLoad";
import Spinner from "../assets/images/spinner.svg";

function Form() {
  const { data, loading, inputValue, submit, handleChange, handleSubmit } =
    useFetchSubmit();

  const dataArray = Array.isArray(data) ? data : [data];

  useEffect(() => {
    console.log(data);
    console.log(dataArray);
  }, [data, dataArray]);
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
        <Button>Search</Button>
      </form>
      {submit === false && (
        <ProductLoad>
          {" "}
          Please enter a URL to search{" "}
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
