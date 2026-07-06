const RegenerateButton = ({ onRegenerate, loading }) => {
  return (
    <button
      onClick={onRegenerate}
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          loading
            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
    >
      {loading ? "Generating..." : "Regenerate"}
    </button>
  );
};

export default RegenerateButton;