function AttendanceCalculator({ attendance }) {
  const calculate = (subject) => {
    const present = subject.present;
    const absent = subject.absent;
    const total = present + absent;

    if (total === 0) {
      return {
        percentage: 0,
        message: "No classes recorded yet.",
        color: "text-gray-500",
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
        message: `Attend next ${x} consecutive classes to reach ${subject.minimumAttendance}%.`,
        color: "text-red-600",
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
      message: `You can safely miss ${x} classes.`,
      color: "text-green-600",
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Attendance Calculator
      </h2>

      <div className="space-y-5">

        {attendance.map((subject) => {

          const result =
            calculate(subject);

          return (

            <div
              key={subject._id}
              className="border rounded-xl p-5"
            >

              <div className="flex justify-between">

                <h3 className="font-semibold text-lg">
                  {subject.subject}
                </h3>

                <span
                  className={`font-bold ${result.color}`}
                >
                  {result.percentage}%
                </span>

              </div>

              <p
                className={`mt-2 ${result.color}`}
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