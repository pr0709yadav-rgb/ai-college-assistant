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

      <label className="block text-lg font-semibold mb-3">
        Career Goal
      </label>

      <select
        value={goal}
        onChange={(e) =>
          setGoal(e.target.value)
        }
        className="w-full border border-gray-300 bg-white text-gray-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">
          Select Goal
        </option>

        {goals.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}

      </select>

    </div>
  );
}

export default GoalSelector;