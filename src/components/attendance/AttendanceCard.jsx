function AttendanceCard({
  subject,
}) {

  const total =
    subject.present +
    subject.absent;

  const percentage =
    total === 0
      ? 0
      : (
          (subject.present /
            total) *
          100
        ).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold">
            {subject.subject}
          </h2>

          <p className="text-gray-500">
            {subject.faculty}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-white
          ${
            percentage >= 75
              ? "bg-green-500"
              : percentage >= 60
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {percentage}%
        </span>

      </div>

      <div className="mt-6">

        <div className="flex justify-between mb-2">

          <span>
            Present
          </span>

          <span>
            {subject.present}
          </span>

        </div>

        <div className="flex justify-between mb-2">

          <span>
            Absent
          </span>

          <span>
            {subject.absent}
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Total
          </span>

          <span>
            {total}
          </span>

        </div>

      </div>

      <div className="mt-6">

        <div className="w-full h-3 bg-gray-200 rounded-full">

          <div
            className={`h-3 rounded-full
            ${
              percentage >= 75
                ? "bg-green-500"
                : percentage >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}

export default AttendanceCard;