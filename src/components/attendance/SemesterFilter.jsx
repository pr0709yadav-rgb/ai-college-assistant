function SemesterFilter({
  semester,
  setSemester,
}) {
  return (
    <select
      value={semester}
      onChange={(e) =>
        setSemester(e.target.value)
      }
      className="border rounded-xl px-4 py-3"
    >
      <option value="All">
        All Semesters
      </option>

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
  );
}

export default SemesterFilter;