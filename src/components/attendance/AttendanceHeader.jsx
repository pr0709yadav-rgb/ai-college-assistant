import { Plus } from "lucide-react";

function AttendanceHeader({ setOpenModal }) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Attendance Tracker
        </h1>

        <p className="mt-2 text-base font-medium text-slate-600 dark:text-slate-300">
          Track your attendance subject-wise.
        </p>
      </div>

      <button
        onClick={() => setOpenModal(true)}
        className="premium-button-primary"
      >
        <Plus size={20} />
        Add Subject
      </button>
    </div>
  );
}

export default AttendanceHeader;