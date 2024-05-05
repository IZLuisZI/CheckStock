import { useState } from "react";
function useSubmitAndFetch() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(null);
  const SERVER = "http://localhost:3000/products/q=";

  const fetchData = async () => {
    setLoading(true);
    setTimeout(async () => {
      const response = await fetch(SERVER + inputValue);
      const data = await response.json();
      setData(data[0]);
      setLoading(false);
    }, 2000); // 2000 milliseconds = 2 seconds
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      setSubmit(false);
      return;
    } else {
      setSubmit(true);
    }
    fetchData();
  };

  const handleChange = (e) => {
    const encodedValue = encodeURIComponent(e.target.value);

    setInputValue(encodedValue);
  };

  return { data, loading, inputValue, submit, handleChange, handleSubmit };
}
export default useSubmitAndFetch;
