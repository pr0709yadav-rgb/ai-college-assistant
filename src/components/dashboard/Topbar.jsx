import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  Settings,
  ChevronDown,
  Moon,
  Sun,
  CalendarDays,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Topbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [search, setSearch] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 👋"
      : "Good Evening 🌙";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header
      className="
      flex
      items-center
      justify-between
      rounded-3xl
      border
      border-slate-200
      bg-white/80
      px-7
      py-5
      shadow-sm
      backdrop-blur-xl
      dark:border-slate-800
      dark:bg-slate-900/80
    "
    >
      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {greeting}
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <CalendarDays size={15} />

          <span>{today}</span>

          <span>•</span>

          <span>Continue your placement preparation.</span>
        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative hidden xl:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="
            w-80
            rounded-2xl
            border
            border-slate-200
            bg-slate-100
            py-3
            pl-11
            pr-4
            text-sm
            text-slate-700
            outline-none
            transition
            focus:border-indigo-500
            focus:bg-white
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-white
            dark:focus:bg-slate-900
          "
          />

        </div>

        {/* Notification */}

        <button
          className="
          relative
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-3
          transition
          hover:scale-105
          hover:shadow-lg
          dark:border-slate-700
          dark:bg-slate-800
        "
        >
          <Bell
            size={20}
            className="text-slate-700 dark:text-white"
          />

          <span
            className="
            absolute
            right-2
            top-2
            h-2.5
            w-2.5
            rounded-full
            bg-red-500
          "
          />
        </button>

        {/* Settings */}

        <div className="relative" ref={menuRef}>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-3
            transition
            hover:rotate-90
            hover:shadow-lg
            dark:border-slate-700
            dark:bg-slate-800
          "
          >
            <Settings
              size={20}
              className="text-slate-700 dark:text-white"
            />
          </button>

          {showSettings && (
            <div
              className="
              absolute
              right-0
              mt-3
              w-56
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-2xl
              overflow-hidden
              dark:border-slate-700
              dark:bg-slate-900
              z-50
            "
            >
              <button
                onClick={() => {
                  toggleTheme();
                  setShowSettings(false);
                }}
                className="
                flex
                w-full
                items-center
                gap-3
                px-5
                py-4
                text-slate-700
                transition
                hover:bg-slate-100
                dark:text-white
                dark:hover:bg-slate-800
              "
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={18} />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          )}

        </div>

        {/* User */}

        <button
          className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-3
          py-2
          transition
          hover:shadow-lg
          dark:border-slate-700
          dark:bg-slate-800
        "
        >
          <div
            className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-indigo-600
            to-cyan-500
            font-bold
            text-white
          "
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="hidden xl:block text-left">

            <p className="font-semibold text-slate-900 dark:text-white">
              {user?.name}
            </p>

            <p className="text-xs text-slate-500">
              Student
            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-slate-400"
          />
        </button>

      </div>
    </header>
  );
};

export default Topbar;