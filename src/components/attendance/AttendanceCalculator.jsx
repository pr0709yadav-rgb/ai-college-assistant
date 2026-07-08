function AttendanceCalculator({ attendance }) {
  const calculate = (subject) => {
    const present = subject.present;
    const absent = subject.absent;
    const total = present + absent;

    if (total === 0) {
      return {
        percentage: 0,
        message: "No classes recorded yet.",
        color: "text-slate-500 dark:text-slate-400",
      };
    }

    const percentage = (present / total) * 100;

    if (percentage < subject.minimumAttendance) {
      let x = 0;

      while (
        ((present + x) / (total + x)) * 100 <
        subject.minimumAttendance
      ) {
        x++;
      }

      return {
        percentage: percentage.toFixed(1),
        message: `Attend the next ${x} consecutive classes to reach ${subject.minimumAttendance}% attendance.`,
        color: "text-red-600 dark:text-red-400",
      };
    }

    let x = 0;

    while (
      (present / (total + x + 1)) * 100 >=
      subject.minimumAttendance
    ) {
      x++;
    }

    return {
      percentage: percentage.toFixed(1),
      message: `You can safely miss ${x} more classes.`,
      color: "text-green-600 dark:text-green-400",
    };
  };

  return (
    <div className="premium-card mt-8 p-6">

      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Attendance Calculator
      </h2>

      <div className="space-y-5">

        {attendance.map((subject) => {
          const result = calculate(subject);

          return (
            <div
              key={subject._id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/60"
            >
              <div className="flex items-center justify-between">

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {subject.subject}
                </h3>

                <span
                  className={`text-lg font-extrabold ${result.color}`}
                >
                  {result.percentage}%
                </span>

              </div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    Number(result.percentage) >=
                    subject.minimumAttendance
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${result.percentage}%`,
                  }}
                />

              </div>

              <p
                className={`mt-4 text-sm font-medium ${result.color}`}
              >
                {result.message}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}

export default AttendanceCalculator;