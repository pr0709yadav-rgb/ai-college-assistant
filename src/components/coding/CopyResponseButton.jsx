import { useState } from "react";

const CopyResponseButton = ({ response }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!response) return;

    try {
      await navigator.clipboard.writeText(response);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={!response}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          response
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
    >
      {copied ? "Copied ✓" : "Copy Response"}
    </button>
  );
};

export default CopyResponseButton;