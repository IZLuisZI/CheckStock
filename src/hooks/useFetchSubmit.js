import { useState } from "react";
/**
 * Custom hook for submitting and fetching data.
 *
 * @returns {Object} An object containing the following properties:
 *   - data: The fetched data.
 *   - loading: A boolean indicating if the data is being fetched.
 *   - inputValue: The current input value.
 *   - submit: A boolean indicating if the form has been submitted.
 *   - handleChange: A function to handle input value changes.
 *   - handleSubmit: A function to handle form submission.
 */
function useSubmitAndFetch() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(null);
  const SERVER = "http://localhost:3000/products/q=";

  const fetchData = async () => {
    setLoading(true);

    const response = await fetch(SERVER + inputValue);
    const data = await response.json();
    setData(data[0]);
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputUrl = inputValue.includes("bestbuy.com");
    if (inputValue === "" || !inputUrl) {
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
