function AttendanceStats({
  attendance,
}) {

  const totalSubjects =
    attendance.length;

  const totalPresent =
    attendance.reduce(
      (sum, item) => sum + item.present,
      0
    );

  const totalAbsent =
    attendance.reduce(
      (sum, item) => sum + item.absent,
      0
    );

  const totalClasses =
    totalPresent + totalAbsent;

  const overallAttendance =
    totalClasses === 0
      ? 0
      : (
          (totalPresent /
            totalClasses) *
          100
        ).toFixed(1);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition"
        >

          <div
            className={`w-12 h-12 rounded-xl ${card.color} mb-4`}
          />

          <h3 className="text-slate-500 text-sm">
            {card.title}
          </h3>

          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            {card.value}
          </h2>

        </div>

      ))}

    </div>
  );
}

export default AttendanceStats;