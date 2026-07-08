function ProgressTracker({ roadmap }) {
  if (!roadmap.length) return null;

  let totalTasks = 0;
  let completedTasks = 0;

  roadmap.forEach((week) => {
    week.tasks.forEach((task) => {
      totalTasks++;

      if (task.completed) {
        completedTasks++;
      }
    });
  });

  const percentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-6 transition-all duration-300">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Progress Tracker
        </h2>

        <span className="px-4 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-semibold">
          {percentage}% Complete
        </span>

      </div>

      {/* Progress Bar */}

      <div className="w-full h-4 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center">

          <p className="text-sm text-gray-600 dark:text-slate-400">
            Completed
          </p>

          <h3 className="text-2xl font-bold text-green-600 mt-1">
            {completedTasks}
          </h3>

        </div>

        <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-center">

          <p className="text-sm text-gray-600 dark:text-slate-400">
            Total Tasks
          </p>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {totalTasks}
          </h3>

        </div>

      </div>

    </div>
  );
}

export default ProgressTracker;