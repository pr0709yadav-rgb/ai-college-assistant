const suggestions = [
  {
    title: "Explain Code",
    prompt: "Explain this code step by step."
  },
  {
    title: "Find Bugs",
    prompt: "Find all bugs in this code and fix them."
  },
  {
    title: "Optimize",
    prompt: "Optimize this code for better performance."
  },
  {
    title: "Time Complexity",
    prompt: "Find the time complexity of this code."
  },
  {
    title: "Space Complexity",
    prompt: "Find the space complexity of this code."
  },
  {
    title: "Add Comments",
    prompt: "Add proper comments to this code."
  },
  {
    title: "Refactor",
    prompt: "Refactor this code using best practices."
  },
  {
    title: "Convert Language",
    prompt: "Convert this code to Python."
  },
];

const PromptSuggestions = ({ setPrompt }) => {
  return (
    <div>
      <h3 className="text-white font-semibold mb-3">
        Quick Prompts
      </h3>

      <div className="flex flex-wrap gap-3">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => setPrompt(item.prompt)}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-blue-600 text-white text-sm transition-all duration-300"
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;