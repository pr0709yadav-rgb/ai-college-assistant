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
  FaGraduationCap,
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
    <aside
      className="
      flex
      h-full
      w-80
      flex-col
      border-r
      border-slate-200
      bg-white/95
      backdrop-blur-2xl
      dark:border-slate-800
      dark:bg-slate-950/95
    "
    >
      {/* Logo */}

      <div className="border-b border-slate-200 px-7 py-7 dark:border-slate-800">

        <div className="flex items-center gap-4">

          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-violet-600
            via-indigo-600
            to-cyan-500
            text-2xl
            text-white
            shadow-xl
          "
          >
            <FaGraduationCap />
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              AI College
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
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
        px-5
        py-6
        space-y-2
      "
      >
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `
              group
              relative
              flex
              items-center
              gap-4
              rounded-2xl
              px-4
              py-3.5
              transition-all
              duration-300

              ${
                isActive
                  ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-xl shadow-indigo-500/30"
                  : "text-slate-700 hover:bg-gradient-to-r hover:from-violet-100 hover:via-indigo-100 hover:to-cyan-100 hover:text-indigo-700 dark:text-slate-300 dark:hover:from-violet-900/40 dark:hover:via-indigo-900/40 dark:hover:to-cyan-900/40 dark:hover:text-cyan-300"
                              }
            `
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                )}

                <div
                  className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-white/20"
                      : "bg-slate-200 text-slate-700 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-indigo-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:group-hover:from-violet-600 dark:group-hover:to-indigo-600"
                                      }
                `}
                >
                  {item.icon}
                </div>

                <span className="font-medium tracking-wide">
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}

      <div className="border-t border-slate-200 p-5 dark:border-slate-800">

        <button
          onClick={handleLogout}
          className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-red-50
          py-3.5
          font-semibold
          text-red-600
          transition-all
          duration-300
          hover:bg-red-600
          hover:text-white
          hover:shadow-lg
          dark:bg-red-500/10
          dark:text-red-400
          dark:hover:bg-red-600
          dark:hover:text-white
        "
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;