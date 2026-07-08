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
      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
        Programming Language
      </label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
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

          outline-none

          transition-all
          duration-200

          focus:border-cyan-500
          focus:ring-2
          focus:ring-cyan-500/20

          cursor-pointer
        "
      >
        {languages.map((lang) => (
          <option
            key={lang.value}
            value={lang.value}
            className="bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;