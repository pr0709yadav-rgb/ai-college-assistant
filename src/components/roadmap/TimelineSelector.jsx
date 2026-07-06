const durations = [
  "1 Month",
  "3 Months",
  "6 Months",
  "12 Months",
];

function TimelineSelector({
  duration,
  setDuration,
}) {
  return (
    <div className="mb-6">

      <label className="block text-lg font-semibold mb-3">
        Roadmap Duration
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {durations.map((item) => (

          <button
            key={item}
            type="button"
            onClick={() =>
              setDuration(item)
            }
            className={`rounded-xl py-3 font-medium transition ${
              duration === item
                ? "bg-green-600 text-white"
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

export default TimelineSelector;