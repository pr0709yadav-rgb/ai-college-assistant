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

function AttendanceCharts({ attendance }) {
  const totalPresent = attendance.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const totalAbsent = attendance.reduce(
    (sum, item) => sum + item.absent,
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

  const COLORS = ["#22c55e", "#ef4444"];

  const barData = attendance.map((item) => ({
    subject: item.subject,
    attendance:
      item.present + item.absent === 0
        ? 0
        : (
            (item.present /
              (item.present + item.absent)) *
            100
          ).toFixed(1),
  }));

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">

      {/* Pie Chart */}

      <div className="premium-card p-6">

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
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
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Bar Chart */}

      <div className="premium-card p-6">

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
          Subject Comparison
        </h2>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={barData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#475569"
              opacity={0.25}
            />

            <XAxis
              dataKey="subject"
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <YAxis
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            <Bar
              dataKey="attendance"
              radius={[8, 8, 0, 0]}
              fill="#3b82f6"
            />

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AttendanceCharts;