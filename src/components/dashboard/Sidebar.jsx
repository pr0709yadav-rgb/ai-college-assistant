import { NavLink, useNavigate } from "react-router-dom";
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
import { HiOutlineDocumentText } from "react-icons/hi";

import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const menu = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    name: "AI Chat",
    icon: <FaRobot />,
    path: "/chat",
  },
  {
    name: "PDF Chat",
    icon: <HiOutlineDocumentText />,
    path: "/pdf-chat",
  },
  {
    name: "Resume",
    icon: <FaFileAlt />,
    path: "/resume",
  },
  {
    name: "Coding",
    icon: <FaCode />,
    path: "/coding",
  },
  {
    name: "Attendance",
    icon: <FaCalendarAlt />,
    path: "/attendance",
  },
  {
    name: "Roadmap",
    icon: <FaRoad />,
    path: "/roadmap",
  },
  {
    name: "Interview",
    icon: <FaMicrophone />,
    path: "/interview",
  },
  {
    name: "Profile",
    icon: <FaUser />,
    path: "/profile",
  },
];

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <aside className="flex h-full w-72 flex-col bg-slate-900/95 backdrop-blur-xl">

      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 text-2xl font-bold text-white shadow-lg">
            AI
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              College Assistant
            </h1>

            <p className="text-sm text-slate-400">
              Smart Learning Platform
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav
        className="
          flex-1
          overflow-y-auto
          custom-scrollbar
          px-4
          py-3
          space-y-2
        "
      >
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `group flex items-center gap-4 rounded-xl px-5 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            <span className="font-medium">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-slate-800
            py-3
            font-semibold
            text-slate-200
            transition-all
            duration-300
            hover:bg-red-600
            hover:text-white
          "
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;