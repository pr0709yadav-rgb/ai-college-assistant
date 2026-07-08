const goals = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Android Developer",
  "Data Scientist",
  "AI / ML Engineer",
  "Cyber Security",
  "DevOps Engineer",
  "UI / UX Designer",
  "Software Engineer",
];

function GoalSelector({
  goal,
  setGoal,
}) {
  return (
    <div className="mb-6">

      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Career Goal
      </label>

      <select
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="
          w-full
          rounded-xl
          border

          border-gray-300
          dark:border-slate-600

          bg-white
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
        <option
          value=""
          className="bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
        >
          Select Goal
        </option>

        {goals.map((item) => (
          <option
            key={item}
            value={item}
            className="bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            {item}
          </option>
        ))}

      </select>

    </div>
  );
}

export default GoalSelector;