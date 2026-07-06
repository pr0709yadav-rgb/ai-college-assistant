import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function AttendanceCharts({
  attendance,
}) {
  const totalPresent =
    attendance.reduce(
      (sum, item) =>
        sum + item.present,
      0
    );

  const totalAbsent =
    attendance.reduce(
      (sum, item) =>
        sum + item.absent,
      0
    );

  const pieData = [
    {
      name: "Present",
      value: totalPresent,
    },
    {
      name: "Absent",
      value: totalAbsent,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  const barData =
    attendance.map((item) => ({
      subject: item.subject,
      attendance:
        item.present + item.absent === 0
          ? 0
          : (
              (item.present /
                (item.present +
                  item.absent)) *
              100
            ).toFixed(1),
    }));

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-8">

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-5">
          Overall Attendance
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={110}
              label
            >

              {pieData.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-5">
          Subject Comparison
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <BarChart
            data={barData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="subject"
            />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="attendance"
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AttendanceCharts;