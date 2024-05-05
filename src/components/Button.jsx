function Button({ children }) {
  return (
    <button
      type="submit"
      className="bg-blue-700 flex items-center gap-2 hover:bg-blue-800 rounded-xl p-2 dark:text-white font-bold transition-all ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {children}
    </button>
  );
}
export default Button;
