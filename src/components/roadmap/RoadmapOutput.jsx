import {
  CheckCircle2,
  Circle,
  Calendar,
} from "lucide-react";

function RoadmapOutput({ roadmap }) {
  if (!roadmap.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-10 mt-8 text-center transition-colors">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          No Roadmap Generated
        </h2>

        <p className="mt-3 text-gray-600 dark:text-slate-400">
          Select your goal and click Generate AI Roadmap.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Your AI Learning Roadmap
      </h2>

      <div className="space-y-8">

        {roadmap.map((week) => (

          <div
            key={week.week}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
          >

            {/* Header */}

            <div className="bg-cyan-600 text-white px-8 py-6 flex justify-between items-center">

              <div>

                <h3 className="text-3xl font-bold">
                  Week {week.week}
                </h3>

                <p className="text-cyan-100 text-lg mt-1">
                  {week.title}
                </p>

              </div>

              <Calendar size={30} />

            </div>

            {/* Tasks */}

            <div className="p-8 space-y-4">

              {week.tasks.map((task, index) => (

                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-4

                    rounded-xl
                    border

                    border-gray-200
                    dark:border-slate-700

                    bg-gray-50
                    dark:bg-slate-900

                    p-4

                    transition-all
                    duration-200

                    hover:bg-cyan-50
                    dark:hover:bg-slate-700
                  "
                >

                  {task.completed ? (
                    <CheckCircle2
                      size={24}
                      className="text-green-500"
                    />
                  ) : (
                    <Circle
                      size={24}
                      className="text-gray-400 dark:text-slate-500"
                    />
                  )}

                  <span
                    className={`text-lg font-medium transition-colors ${
                      task.completed
                        ? "line-through text-gray-400 dark:text-slate-500"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {task.task}
                  </span>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RoadmapOutput;