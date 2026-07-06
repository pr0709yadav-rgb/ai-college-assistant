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
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Progress
      </h2>

      <div className="w-full bg-gray-200 rounded-full h-5">

        <div
          className="bg-green-600 h-5 rounded-full transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="flex justify-between mt-3">

        <span>
          {completedTasks}/{totalTasks} Tasks
        </span>

        <span className="font-bold">
          {percentage}%
        </span>

      </div>

    </div>
  );
}

export default ProgressTracker;