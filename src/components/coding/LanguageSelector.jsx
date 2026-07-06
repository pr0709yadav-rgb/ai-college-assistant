const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
  { value: "typescript", label: "TypeScript" },
  { value: "go", label: "Go" },
  { value: "php", label: "PHP" },
  { value: "rust", label: "Rust" },
];

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-white mb-2">
        Programming Language
      </label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-slate-600
          bg-slate-700
          text-white
          px-4
          py-3
          outline-none
          focus:border-blue-500
          transition
        "
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;