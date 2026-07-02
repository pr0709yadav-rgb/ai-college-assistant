import { Link, useNavigate } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa";
import {
  FaHome,
  FaRobot,
  FaFileAlt,
  FaCode,
  FaCalendarAlt,
  FaRoad,
  FaMicrophone,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const menu = [
  { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
  { name: "AI Chat", icon: <FaRobot />, path: "/chat" },
  { name: "PDF Chat", icon: <FaFilePdf />, path: "/pdf-chat" },
  { name: "Resume", icon: <FaFileAlt />, path: "/resume" },
  { name: "Coding", icon: <FaCode />, path: "/coding" },
  { name: "Attendance", icon: <FaCalendarAlt />, path: "/attendance" },
  { name: "Roadmap", icon: <FaRoad />, path: "/roadmap" },
  { name: "Interview", icon: <FaMicrophone />, path: "/interview" },
  { name: "Profile", icon: <FaUser />, path: "/profile" },
];

function Sidebar() {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully.");

    navigate("/login");
  };

  return (
    <aside className="w-72 bg-slate-800 flex flex-col min-h-screen border-r border-slate-700">

      {/* Logo */}

      <div className="p-8 border-b border-slate-700">

        <h1 className="text-3xl font-bold text-cyan-400">
          AI College Assistant
        </h1>

        {user && (
          <div className="mt-4">

            <p className="text-white font-semibold">
              {user.name}
            </p>

            <p className="text-sm text-slate-400">
              {user.email}
            </p>

          </div>
        )}

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        {menu.map((item) => (

          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-slate-700 transition mb-2"
          >

            <span className="text-cyan-400 text-lg">
              {item.icon}
            </span>

            <span className="text-white">
              {item.name}
            </span>

          </Link>

        ))}

      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition text-white font-medium"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;