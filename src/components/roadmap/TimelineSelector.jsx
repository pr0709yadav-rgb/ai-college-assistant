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

      <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Roadmap Duration
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {durations.map((item) => {

          const active = duration === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setDuration(item)}
              className={`
                rounded-xl
                py-4
                px-4

                border

                font-semibold

                transition-all
                duration-300

                ${
                  active
                    ? `
                      bg-cyan-500
                      border-cyan-500
                      text-white
                      shadow-lg
                      shadow-cyan-500/20
                      scale-105
                    `
                    : `
                      bg-white
                      dark:bg-slate-800

                      border-gray-300
                      dark:border-slate-700

                      text-gray-800
                      dark:text-slate-200

                      hover:bg-cyan-50
                      dark:hover:bg-slate-700

                      hover:border-cyan-500
                      hover:text-cyan-600
                      dark:hover:text-cyan-400

                      hover:-translate-y-1
                    `
                }
              `}
            >
              {item}
            </button>
          );

        })}

      </div>

    </div>
  );
}

export default TimelineSelector;