import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">
          {children}
        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;