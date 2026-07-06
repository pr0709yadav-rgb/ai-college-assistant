const PromptInput = ({ prompt, setPrompt }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-white mb-2">
        AI Prompt
      </label>

      <textarea
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Examples:
• Explain this code
• Find bugs
• Optimize the code
• Improve time complexity
• Convert to Python
• Add comments"
        className="
          w-full
          rounded-lg
          border
          border-slate-600
          bg-slate-700
          text-white
          px-4
          py-3
          resize-none
          outline-none
          transition
          focus:border-blue-500
          placeholder:text-slate-400
        "
      />
    </div>
  );
};

export default PromptInput;