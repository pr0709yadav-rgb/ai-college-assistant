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

    const confirmDelete = window.confirm(
      "Delete this subject?"
    );

    if (!confirmDelete) return;

    try {

      await deleteSubject(id);

      refreshAttendance();

    } catch (error) {

      console.log(error);

    }

  };

  if (attendance.length === 0) {

    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">

        <h2 className="text-xl font-semibold text-gray-700">
          No Subjects Added
        </h2>

        <p className="text-gray-500 mt-2">
          Click "Add Subject" to begin tracking
          attendance.
        </p>

      </div>
    );

  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Subject
              </th>

              <th className="px-5 py-4 text-left">
                Faculty
              </th>

              <th className="px-5 py-4 text-center">
                Present
              </th>

              <th className="px-5 py-4 text-center">
                Absent
              </th>

              <th className="px-5 py-4 text-center">
                Total
              </th>

              <th className="px-5 py-4 text-center">
                Attendance
              </th>

              <th className="px-5 py-4 text-center">
                Progress
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {attendance.map((item) => {

              const total =
                item.present + item.absent;

              const percentage =
                total === 0
                  ? 0
                  : (
                      (item.present /
                        total) *
                      100
                    ).toFixed(1);

              return (

                <tr
                  key={item._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-5 py-5 font-semibold">

                    {item.subject}

                  </td>

                  <td className="px-5 py-5">

                    {item.faculty || "-"}

                  </td>

                  <td className="text-center">

                    {item.present}

                  </td>

                  <td className="text-center">

                    {item.absent}

                  </td>

                  <td className="text-center">

                    {total}

                  </td>

                  <td className="text-center font-semibold">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm
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

                    <div className="w-full bg-gray-200 rounded-full h-3">

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

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          handlePresent(item._id)
                        }
                        className="text-green-600 hover:scale-110 transition"
                        title="Present"
                      >
                        <CheckCircle size={22} />
                      </button>

                      <button
                        onClick={() =>
                          handleAbsent(item._id)
                        }
                        className="text-yellow-600 hover:scale-110 transition"
                        title="Absent"
                      >
                        <XCircle size={22} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="text-red-600 hover:scale-110 transition"
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