import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  return (
    <header className="flex h-20 items-center justify-between">

      {/* Left */}
      <div>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Continue your placement preparation.
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="
              w-72
              rounded-2xl
              border
              border-white/10
              bg-slate-800/60
              py-3
              pl-11
              pr-4
              text-sm
              text-white
              outline-none
              backdrop-blur
              transition
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/30
            "
          />

        </div>

        {/* Notification */}

        <button
          className="
            rounded-2xl
            border
            border-white/10
            bg-slate-800/60
            p-3
            transition
            hover:bg-slate-700
          "
        >
          <Bell size={20} />
        </button>

        {/* Settings */}

        <button
          className="
            rounded-2xl
            border
            border-white/10
            bg-slate-800/60
            p-3
            transition
            hover:bg-slate-700
          "
        >
          <Settings size={20} />
        </button>

        {/* User */}

        <button
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-slate-800/60
            px-3
            py-2
            transition
            hover:bg-slate-700
          "
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-lg font-bold text-white">
            {user?.name?.charAt(0)}
          </div>

          <div className="hidden text-left xl:block">

            <p className="font-semibold text-white">
              {user?.name}
            </p>

            <p className="text-xs text-slate-400">
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