import React from "react";
import ReactDom from "react-dom";

function ModalForm({ open, setOpen }) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div
        onClick={() => {
          setOpen(false);
        }}
        className="h-screen w-screen top-0 fixed bg-gray-400 opacity-30 backdrop-filter backdrop-blur-3xl"
      ></div>
      <div className="bg-slate-900 rounded-xl  w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
        <form action="POST" className="flex flex-col gap-4">
          <label htmlFor="email">
            <h2 className="text-white dark:text-white font-bold text-2xl">
              Enter your email
            </h2>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              autoComplete="off"
              className="p-2 w-full rounded-lg dark:bg-gray-800 dark:text-white mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-white focus:ring-opacity-50"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-800 rounded-lg p-2 text-black dark:text-white font-bold hover:bg-blue-900"
          >
            Subscribe
          </button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}
export default ModalForm;
