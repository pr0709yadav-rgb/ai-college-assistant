import { Link } from "react-router-dom";

function DashboardCard({
  title,
  value,
  color,
  path,
}) {
  return (
    <Link to={path}>
      <div
        className={`${color}
        rounded-xl
        p-6
        shadow-lg
        hover:scale-105
        hover:shadow-cyan-500/40
        transition
        duration-300
        cursor-pointer`}
      >
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-5xl font-bold mt-5">
          {value}
        </p>
      </div>
    </Link>
  );
}

export default DashboardCard;