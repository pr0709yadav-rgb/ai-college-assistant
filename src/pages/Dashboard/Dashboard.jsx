import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import RecentActivity from "../../components/dashboard/RecentActivity";

function Dashboard() {
  return (
    <DashboardLayout>

      {/* Everything inside the old p-8 goes here */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard
          title="AI Chat"
          value="58"
          color="bg-cyan-600"
          path="/chat"
        />

        <DashboardCard
          title="PDF Chat"
          value="24 PDFs"
          color="bg-orange-600"
          path="/pdf-chat"
        />

        <DashboardCard
          title="Resume Score"
          value="92%"
          color="bg-green-600"
          path="/resume"
        />

        <DashboardCard
          title="Attendance"
          value="84%"
          color="bg-purple-600"
          path="/attendance"
        />

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="text-gray-400">Today's AI Questions</h3>
          <p className="text-4xl font-bold text-cyan-400 mt-3">12</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="text-gray-400">PDFs Uploaded</h3>
          <p className="text-4xl font-bold text-orange-400 mt-3">24</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <h3 className="text-gray-400">Resume Score</h3>
          <p className="text-4xl font-bold text-yellow-400 mt-3">92%</p>
        </div>

      </div>

      <RecentActivity />

    </DashboardLayout>
  );
}

export default Dashboard;