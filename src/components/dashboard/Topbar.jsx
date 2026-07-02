import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  return (
    <div className="flex justify-between items-center bg-slate-800 px-8 py-5 border-b border-slate-700">

      <div>

        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-gray-400">
          Continue your placement preparation.
        </p>

      </div>

      <div className="flex items-center gap-6">

        <FaBell
          className="text-2xl cursor-pointer hover:text-cyan-400"
        />

        <FaUserCircle
          className="text-5xl text-cyan-400 cursor-pointer"
        />

      </div>

    </div>
  );
}

export default Topbar;