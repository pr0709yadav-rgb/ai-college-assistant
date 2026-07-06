import { Plus } from "lucide-react";

function AttendanceHeader({
  setOpenModal,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Attendance Tracker
        </h1>

        <p className="text-slate-500 mt-1">
          Track your attendance subject-wise.
        </p>

      </div>

      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
      >
        <Plus size={20} />

        Add Subject
      </button>

    </div>
  );
}

export default AttendanceHeader;