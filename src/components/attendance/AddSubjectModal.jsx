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
      [e.target.name]:
        e.target.value,
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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">
          Add Subject
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="font-medium block mb-2">
              Semester
            </label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              {[1,2,3,4,5,6,7,8].map(
                (sem)=>(
                  <option
                    key={sem}
                    value={sem}
                  >
                    Semester {sem}
                  </option>
                )
              )}
            </select>

          </div>

          <div>

            <label className="font-medium block mb-2">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="DBMS"
              className="w-full border rounded-lg p-3"
              required
            />

          </div>

          <div>

            <label className="font-medium block mb-2">
              Faculty
            </label>

            <input
              type="text"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              placeholder="Faculty Name"
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="font-medium block mb-2">
              Minimum Attendance
            </label>

            <input
              type="number"
              name="minimumAttendance"
              value={
                formData.minimumAttendance
              }
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading
                ? "Adding..."
                : "Add Subject"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddSubjectModal;