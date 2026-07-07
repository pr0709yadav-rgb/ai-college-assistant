import {
  FaRobot,
  FaCode,
  FaFileAlt,
  FaRoad,
  FaCalendarCheck,
  FaMicrophone,
} from "react-icons/fa";

const iconMap = {
  "AI Chat": {
    icon: <FaRobot />,
    color: "from-indigo-500 to-cyan-500",
  },

  Coding: {
    icon: <FaCode />,
    color: "from-purple-500 to-pink-500",
  },

  Resume: {
    icon: <FaFileAlt />,
    color: "from-green-500 to-emerald-500",
  },

  Roadmap: {
    icon: <FaRoad />,
    color: "from-orange-500 to-red-500",
  },

  Attendance: {
    icon: <FaCalendarCheck />,
    color: "from-cyan-500 to-blue-500",
  },

  Interview: {
    icon: <FaMicrophone />,
    color: "from-pink-500 to-red-500",
  },

  "PDF Chat": {
    icon: <FaFileAlt />,
    color: "from-yellow-500 to-orange-500",
  },
};

function RecentActivity({ activity = [] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest learning progress
          </p>
        </div>

        <button className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700">
          View All
        </button>
      </div>

      {/* Activities */}

      <div className="space-y-5">
        {activity.length === 0 ? (
          <div className="rounded-2xl bg-slate-800 p-8 text-center text-slate-400">
            No recent activity found.
          </div>
        ) : (
          activity.map((item) => {
            const current =
              iconMap[item.module] || iconMap["AI Chat"];

            return (
              <div
                key={item._id}
                className="group flex items-center justify-between rounded-2xl border border-transparent bg-slate-800/60 p-4 transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${current.color} text-white shadow-lg`}
                  >
                    {current.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white group-hover:text-indigo-300">
                      {item.action}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {item.module} •{" "}
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default RecentActivity;