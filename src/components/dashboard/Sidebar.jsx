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
      border
      border-white/70
      bg-white/88
      backdrop-blur-2xl
      dark:border-white/10
      dark:bg-slate-950/88
    "
    >
      {/* Logo */}

      <div className="border-b border-slate-200/70 px-6 py-6 dark:border-white/10">

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
            shadow-indigo-500/20
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
        px-4
        py-5
        space-y-1.5
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
              px-3.5
              py-3
              transition-all
              duration-200

              ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-xl shadow-cyan-500/20"
                  : "text-slate-700 hover:bg-slate-950/[0.04] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.07] dark:hover:text-white"
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
                  duration-200

                  ${
                    isActive
                      ? "bg-white/20"
                      : "bg-slate-100 text-slate-600 group-hover:bg-white group-hover:text-cyan-600 dark:bg-white/[0.06] dark:text-slate-300 dark:group-hover:bg-white/[0.1] dark:group-hover:text-cyan-300"
                                      }
                `}
                >
                  {item.icon}
                </div>

                <span className="font-medium">
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}

      <div className="border-t border-slate-200/70 p-4 dark:border-white/10">

        <button
          onClick={handleLogout}
          className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-red-50
          py-3.5
          font-semibold
          text-red-600
          transition-all
          duration-200
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
