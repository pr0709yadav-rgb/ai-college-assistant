function RecentActivity() {

  const activities = [
    "Asked AI 12 Questions",
    "Completed 5 Coding Problems",
    "Uploaded Resume",
    "Generated Placement Roadmap",
    "Calculated Attendance",
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="border-b border-slate-700 pb-4"
          >
            {activity}
          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentActivity;