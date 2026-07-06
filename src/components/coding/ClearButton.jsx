const ClearButton = ({
  setPrompt,
  setCode,
  setResponse,
  setError,
}) => {
  const handleClear = () => {
    setPrompt("");
    setCode("");
    setResponse("");

    if (setError) {
      setError("");
    }
  };

  return (
    <button
      onClick={handleClear}
      className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
    >
      Clear All
    </button>
  );
};

export default ClearButton;