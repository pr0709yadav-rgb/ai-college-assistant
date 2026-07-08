function AttendanceStats({ attendance }) {
  const totalSubjects = attendance.length;

  const totalPresent = attendance.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const totalAbsent = attendance.reduce(
    (sum, item) => sum + item.absent,
    0
  );

  const totalClasses = totalPresent + totalAbsent;

  const overallAttendance =
    totalClasses === 0
      ? 0
      : ((totalPresent / totalClasses) * 100).toFixed(1);

  const cards = [
    {
      title: "Overall Attendance",
      value: `${overallAttendance}%`,
      color: "bg-blue-500",
    },
    {
      title: "Subjects",
      value: totalSubjects,
      color: "bg-green-500",
    },
    {
      title: "Present",
      value: totalPresent,
      color: "bg-emerald-500",
    },
    {
      title: "Absent",
      value: totalAbsent,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="premium-card p-6 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
        >
          <div
            className={`w-12 h-12 rounded-xl ${card.color} mb-5 shadow-lg`}
          />

          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            {card.title}
          </h3>

          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default AttendanceStats;