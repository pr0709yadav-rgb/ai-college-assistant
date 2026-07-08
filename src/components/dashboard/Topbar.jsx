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
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="surface flex items-center justify-between rounded-2xl px-5 py-4 sm:px-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          {greeting}
        </h1>

        <div className="mt-2 hidden items-center gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex">
          <CalendarDays size={15} />
          <span>{today}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span>Continue your placement preparation.</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden xl:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="premium-input w-80 pl-11"
          />
        </div>

        <button
          className="relative rounded-xl border border-slate-200/80 bg-white/90 p-3 text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500 dark:border-slate-900" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="rounded-xl border border-slate-200/80 bg-white/90 p-3 text-slate-700 shadow-sm transition-all hover:rotate-90 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>

          {showSettings && (
            <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-xl border border-slate-200/80 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95">
              <button
                onClick={() => {
                  toggleTheme();
                  setShowSettings(false);
                }}
                className="flex w-full items-center gap-3 px-5 py-4 text-slate-700 transition hover:bg-slate-100/80 dark:text-white dark:hover:bg-white/[0.06]"
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

        <button className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 shadow-sm transition-all hover:shadow-lg dark:border-white/10 dark:bg-white/[0.06]">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 font-bold text-white shadow-lg shadow-cyan-500/20">
            {user?.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <div className="hidden text-left xl:block">
            <p className="font-semibold text-slate-900 dark:text-white">
              {user?.name || "Student"}
            </p>
            <p className="text-xs text-slate-500">Student</p>
          </div>

          <ChevronDown size={18} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
