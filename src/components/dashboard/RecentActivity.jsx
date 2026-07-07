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
      rounded-3xl
      border
      border-slate-200
      bg-slate-50
      p-5
      shadow-sm
      dark:border-slate-800
      dark:bg-slate-900/80
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
            bg-slate-200
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-indigo-500
            hover:text-white
            dark:bg-slate-800
            dark:text-white
            dark:hover:bg-indigo-600
          "
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      {activity.length === 0 ? (
        <div
          className="
          rounded-2xl
          border
          border-dashed
          border-slate-300
          py-8
          text-center
          text-slate-500
          dark:border-slate-700
          dark:text-slate-400
        "
        >
          No recent activity found.
        </div>
      ) : (
        <div className="relative">

          {/* Timeline */}

          <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-300 dark:bg-slate-700" />

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
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3
                    transition-all
                    duration-300
                    hover:border-indigo-400
                    hover:shadow-md
                    dark:border-slate-700
                    dark:bg-slate-800
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