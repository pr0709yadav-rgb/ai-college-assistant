import { useState } from "react";
import {
  FaRobot,
  FaCode,
  FaFileAlt,
  FaRoad,
  FaCalendarCheck,
  FaMicrophone,
} from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

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
  const [showAll, setShowAll] = useState(false);

  const displayedActivities = showAll
    ? activity
    : activity.slice(0, 4);

  return (
    <div
      className="
      premium-card
      p-5
    "
    >
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Latest updates
          </p>
        </div>

        {activity.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="
            rounded-xl
            bg-slate-100
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            transition-all
            hover:-translate-y-0.5
            hover:bg-slate-950
            hover:text-white
            dark:bg-white/[0.07]
            dark:text-white
            dark:hover:bg-white/[0.12]
          "
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      {activity.length === 0 ? (
        <div
          className="
          rounded-xl
          border
          border-dashed
          border-slate-300
          bg-white/60
          py-10
          text-center
          text-slate-500
          dark:border-slate-700
          dark:bg-white/[0.03]
          dark:text-slate-400
        "
        >
          No recent activity found.
        </div>
      ) : (
        <div className="relative">

          {/* Timeline */}

          <div className="absolute bottom-0 left-5 top-0 w-px bg-slate-200 dark:bg-white/10" />

          <div className="space-y-4">

            {displayedActivities.map((item) => {
              const current =
                iconMap[item.module] || iconMap["AI Chat"];

              return (
                <div
                  key={item._id}
                  className="group flex items-start gap-4"
                >
                  {/* Icon */}

                  <div
                    className={`
                    relative
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    ${current.color}
                    text-sm
                    text-white
                    shadow-md
                  `}
                  >
                    {current.icon}
                  </div>

                  {/* Card */}

                  <div
                    className="
                    flex-1
                    rounded-xl
                    border
                    border-slate-200/80
                    bg-white/80
                    px-4
                    py-3
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-cyan-300
                    hover:shadow-md
                    dark:border-white/10
                    dark:bg-white/[0.05]
                  "
                  >
                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="font-semibold text-slate-800 dark:text-white">
                          {item.action}
                        </h3>

                        <p className="text-sm text-indigo-600 dark:text-indigo-400">
                          {item.module}
                        </p>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>

                      </div>

                      <ArrowUpRight
                        size={18}
                        className="
                        text-slate-400
                        transition-all
                        group-hover:-translate-y-1
                        group-hover:translate-x-1
                        group-hover:text-indigo-500
                      "
                      />

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!showAll && activity.length > 4 && (
            <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
              Showing latest <strong>4</strong> activities
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
