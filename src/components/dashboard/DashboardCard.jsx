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
        premium-card
        p-6
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-cyan-300/70
        hover:shadow-2xl
        hover:shadow-cyan-500/10
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
          blur-2xl
          transition
          duration-500
          group-hover:opacity-25
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
            shadow-slate-950/10
          `}
          >
            {icon}
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <TrendingUp size={14} />
            +12%
          </div>
        </div>

        {/* Content */}

        <div className="relative mt-8">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Continue learning
          </p>
        </div>

        {/* Footer */}

        <div className="relative mt-8 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-white/10">
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
