import {
  CheckCircle2,
  Circle,
  Calendar,
} from "lucide-react";

function RoadmapOutput({ roadmap }) {
  if (!roadmap.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10 mt-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          No Roadmap Generated
        </h2>

        <p className="text-gray-600 mt-2">
          Select your goal and click Generate AI Roadmap.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Your AI Learning Roadmap
      </h2>

      <div className="space-y-8">

        {roadmap.map((week) => (

          <div
            key={week.week}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >

            {/* Header */}

            <div className="bg-blue-600 text-white px-8 py-6 flex justify-between items-center">

              <div>

                <h3 className="text-3xl font-bold">
                  Week {week.week}
                </h3>

                <p className="text-blue-100 text-lg mt-1">
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
                  className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 hover:bg-blue-50 transition"
                >

                  {task.completed ? (
                    <CheckCircle2
                      size={24}
                      className="text-green-600"
                    />
                  ) : (
                    <Circle
                      size={24}
                      className="text-gray-400"
                    />
                  )}

                  <span
                    className={`text-lg font-medium ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
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