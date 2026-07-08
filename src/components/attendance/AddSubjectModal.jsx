import { useState } from "react";

import { addSubject } from "../../services/attendance.service";

function AddSubjectModal({
  open,
  setOpen,
  refreshAttendance,
}) {
  const [formData, setFormData] = useState({
    semester: 1,
    subject: "",
    faculty: "",
    minimumAttendance: 75,
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addSubject(formData);

      refreshAttendance();

      setFormData({
        semester: 1,
        subject: "",
        faculty: "",
        minimumAttendance: 75,
      });

      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">

      <div className="w-full max-w-lg rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl p-6 transition-colors">

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Add Subject
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Semester */}

          <div>

            <label className="block mb-2 font-medium text-gray-700 dark:text-slate-300">
              Semester
            </label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                dark:border-slate-600

                bg-gray-50
                dark:bg-slate-700

                text-gray-900
                dark:text-white

                p-3

                outline-none

                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20

                transition-all
              "
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option
                  key={sem}
                  value={sem}
                  className="bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                >
                  Semester {sem}
                </option>
              ))}
            </select>

          </div>

          {/* Subject */}

          <div>

            <label className="block mb-2 font-medium text-gray-700 dark:text-slate-300">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="DBMS"
              required
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                dark:border-slate-600

                bg-gray-50
                dark:bg-slate-700

                text-gray-900
                dark:text-white

                placeholder:text-gray-500
                dark:placeholder:text-slate-400

                p-3

                outline-none

                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20

                transition-all
              "
            />

          </div>

          {/* Faculty */}

          <div>

            <label className="block mb-2 font-medium text-gray-700 dark:text-slate-300">
              Faculty
            </label>

            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              placeholder="Faculty Name"
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                dark:border-slate-600

                bg-gray-50
                dark:bg-slate-700

                text-gray-900
                dark:text-white

                placeholder:text-gray-500
                dark:placeholder:text-slate-400

                p-3

                outline-none

                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20

                transition-all
              "
            />

          </div>

          {/* Minimum Attendance */}

          <div>

            <label className="block mb-2 font-medium text-gray-700 dark:text-slate-300">
              Minimum Attendance
            </label>

            <input
              type="number"
              name="minimumAttendance"
              value={formData.minimumAttendance}
              onChange={handleChange}
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                dark:border-slate-600

                bg-gray-50
                dark:bg-slate-700

                text-gray-900
                dark:text-white

                p-3

                outline-none

                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20

                transition-all
              "
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                px-5
                py-2.5
                rounded-lg

                bg-gray-200
                dark:bg-slate-700

                text-gray-800
                dark:text-white

                hover:bg-gray-300
                dark:hover:bg-slate-600

                transition-all
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                px-6
                py-2.5
                rounded-lg

                bg-cyan-500
                hover:bg-cyan-600

                text-white
                font-medium

                transition-all
              "
            >
              {loading ? "Adding..." : "Add Subject"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddSubjectModal;