const suggestions = [
  {
    title: "💡 Explain Code",
    prompt: "Explain this code step by step.",
  },
  {
    title: "🐞 Find Bugs",
    prompt: "Find all bugs in this code and fix them.",
  },
  {
    title: "⚡ Optimize",
    prompt: "Optimize this code for better performance.",
  },
  {
    title: "⏱ Time Complexity",
    prompt: "Find the time complexity of this code.",
  },
  {
    title: "💾 Space Complexity",
    prompt: "Find the space complexity of this code.",
  },
  {
    title: "📝 Add Comments",
    prompt: "Add proper comments to this code.",
  },
  {
    title: "✨ Refactor",
    prompt: "Refactor this code using best practices.",
  },
  {
    title: "🔄 Convert Language",
    prompt: "Convert this code to Python.",
  },
];

const PromptSuggestions = ({ setPrompt }) => {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
        Quick Prompts
      </h3>

      <div className="flex flex-wrap gap-3">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => setPrompt(item.prompt)}
            className="
              px-4
              py-2.5
              rounded-full

              border
              border-gray-300
              dark:border-slate-600

              bg-white
              dark:bg-slate-700

              text-gray-700
              dark:text-gray-200

              text-sm
              font-medium

              shadow-sm

              transition-all
              duration-200

              hover:bg-cyan-500
              hover:border-cyan-500
              hover:text-white
              hover:shadow-lg
              hover:-translate-y-0.5

              active:scale-95
            "
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;