import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function DashboardCard({
  title,
  value,
  icon,
  color,
  path,
}) {
  return (
    <Link to={path}>

      <div
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-slate-900/70
          backdrop-blur-xl
          p-6
          transition-all
          duration-300
          hover:-translate-y-2
          hover:border-indigo-500/40
          hover:shadow-2xl
          hover:shadow-indigo-500/20
        "
      >

        {/* Top */}

        <div className="flex items-center justify-between">

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

          <ArrowUpRight
            size={22}
            className="
              text-slate-500
              transition-all
              duration-300
              group-hover:text-white
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />

        </div>

        {/* Content */}

        <div className="mt-8">

          <p className="text-sm uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        {/* Bottom Glow */}

        <div
          className={`
            absolute
            bottom-0
            left-0
            h-1
            w-full
            bg-gradient-to-r
            ${color}
          `}
        />

      </div>

    </Link>
  );
}

export default DashboardCard;