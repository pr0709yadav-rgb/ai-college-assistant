import {
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  markPresent,
  markAbsent,
  deleteSubject,
} from "../../services/attendance.service";

function AttendanceTable({
  attendance,
  refreshAttendance,
}) {
  const handlePresent = async (id) => {
    try {
      await markPresent(id);
      refreshAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAbsent = async (id) => {
    try {
      await markAbsent(id);
      refreshAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    try {
      await deleteSubject(id);
      refreshAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  if (attendance.length === 0) {
    return (
      <div className="premium-card p-10 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          No Subjects Added
        </h2>

        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Click "Add Subject" to begin tracking attendance.
        </p>
      </div>
    );
  }

  return (
    <div className="premium-card overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100 dark:bg-slate-800">

            <tr>

              <th className="px-5 py-4 text-left font-bold text-slate-700 dark:text-slate-200">
                Subject
              </th>

              <th className="px-5 py-4 text-left font-bold text-slate-700 dark:text-slate-200">
                Faculty
              </th>

              <th className="px-5 py-4 text-center font-bold text-slate-700 dark:text-slate-200">
                Present
              </th>

              <th className="px-5 py-4 text-center font-bold text-slate-700 dark:text-slate-200">
                Absent
              </th>

              <th className="px-5 py-4 text-center font-bold text-slate-700 dark:text-slate-200">
                Total
              </th>

              <th className="px-5 py-4 text-center font-bold text-slate-700 dark:text-slate-200">
                Attendance
              </th>

              <th className="px-5 py-4 text-center font-bold text-slate-700 dark:text-slate-200">
                Progress
              </th>

              <th className="px-5 py-4 text-center font-bold text-slate-700 dark:text-slate-200">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.map((item) => {

              const total = item.present + item.absent;

              const percentage =
                total === 0
                  ? 0
                  : ((item.present / total) * 100).toFixed(1);

              return (

                <tr
                  key={item._id}
                  className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/40"
                >

                  <td className="px-5 py-5 font-semibold text-slate-900 dark:text-white">
                    {item.subject}
                  </td>

                  <td className="px-5 py-5 text-slate-700 dark:text-slate-300">
                    {item.faculty || "-"}
                  </td>

                  <td className="text-center font-medium text-slate-800 dark:text-slate-200">
                    {item.present}
                  </td>

                  <td className="text-center font-medium text-slate-800 dark:text-slate-200">
                    {item.absent}
                  </td>

                  <td className="text-center font-medium text-slate-800 dark:text-slate-200">
                    {total}
                  </td>

                  <td className="text-center">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold text-white
                      ${
                        percentage >= 75
                          ? "bg-green-500"
                          : percentage >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {percentage}%
                    </span>

                  </td>

                  <td className="px-5">

                    <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700">

                      <div
                        className={`h-3 rounded-full
                        ${
                          percentage >= 75
                            ? "bg-green-500"
                            : percentage >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </td>

                  <td>

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() =>
                          handlePresent(item._id)
                        }
                        className="text-green-600 transition hover:scale-110"
                        title="Present"
                      >
                        <CheckCircle size={22} />
                      </button>

                      <button
                        onClick={() =>
                          handleAbsent(item._id)
                        }
                        className="text-yellow-500 transition hover:scale-110"
                        title="Absent"
                      >
                        <XCircle size={22} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="text-red-600 transition hover:scale-110"
                        title="Delete"
                      >
                        <Trash2 size={22} />
                      </button>

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AttendanceTable;