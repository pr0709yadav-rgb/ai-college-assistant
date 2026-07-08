const PromptInput = ({ prompt, setPrompt }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
        AI Prompt
      </label>

      <textarea
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`Examples:
• Explain this code
• Find bugs
• Optimize the code
• Improve time complexity
• Convert to Python
• Add comments`}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          dark:border-slate-600

          bg-gray-50
          dark:bg-slate-700

          text-gray-900
          dark:text-white

          px-4
          py-3

          resize-none
          outline-none

          transition-all
          duration-200

          focus:border-cyan-500
          focus:ring-2
          focus:ring-cyan-500/20

          placeholder:text-gray-500
          dark:placeholder:text-slate-400
        "
      />
    </div>
  );
};

export default PromptInput;