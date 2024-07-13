function Button({ children, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`bg-blue-700 flex items-center gap-2  rounded-xl p-3 dark:text-white font-bold transition-all ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
        disabled
          ? "cursor-not-allowed opacity-80"
          : "cursor-pointer hover:bg-blue-800"
      }`}
    >
      {children}
    </button>
  );
}
export default Button;
