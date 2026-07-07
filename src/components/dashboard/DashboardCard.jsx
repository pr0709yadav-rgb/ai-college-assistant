import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp } from "lucide-react";

function DashboardCard({
  title,
  value,
  icon,
  color,
  path,
}) {
  return (
    <Link to={path} className="block">
      <div
        className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white/80
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        hover:shadow-indigo-500/10
        dark:border-slate-800
        dark:bg-slate-900/80
      "
      >
        {/* Background Glow */}

        <div
          className={`
          absolute
          -right-8
          -top-8
          h-32
          w-32
          rounded-full
          bg-gradient-to-br
          ${color}
          opacity-10
          blur-3xl
          transition
          duration-500
          group-hover:opacity-20
        `}
        />

        {/* Header */}

        <div className="relative flex items-center justify-between">
          <div
            className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            ${color}
            text-2xl
            text-white
            shadow-lg
          `}
          >
            {icon}
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
            <TrendingUp size={14} />
            +12%
          </div>
        </div>

        {/* Content */}

        <div className="relative mt-8">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Continue learning
          </p>
        </div>

        {/* Footer */}

        <div className="relative mt-8 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Open Module
          </span>

          <ArrowUpRight
            size={20}
            className="
            text-slate-400
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:-translate-y-1
            group-hover:text-indigo-500
          "
          />
        </div>
      </div>
    </Link>
  );
}

export default DashboardCard;