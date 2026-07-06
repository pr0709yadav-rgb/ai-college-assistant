const levels = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

function SkillLevel({
  level,
  setLevel,
}) {
  return (
    <div className="mb-6">

      <label className="block text-lg font-semibold mb-3">
        Current Skill Level
      </label>

      <div className="grid grid-cols-3 gap-4">

        {levels.map((item) => (

          <button
            key={item}
            type="button"
            onClick={() =>
              setLevel(item)
            }
            className={`rounded-xl py-3 font-medium transition ${
              level === item
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

    </div>
  );
}

export default SkillLevel;