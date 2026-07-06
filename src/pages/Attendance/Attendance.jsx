import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import AttendanceHeader from "../../components/attendance/AttendanceHeader";
import AttendanceStats from "../../components/attendance/AttendanceStats";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceCharts from "../../components/attendance/AttendanceCharts";
import AttendanceCalculator from "../../components/attendance/AttendanceCalculator";
import AddSubjectModal from "../../components/attendance/AddSubjectModal";
import SearchBar from "../../components/attendance/SearchBar";
import SemesterFilter from "../../components/attendance/SemesterFilter";
import ExportButtons from "../../components/attendance/ExportButtons";

import {
  getAttendance,
} from "../../services/attendance.service";

function Attendance() {
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");

  const [semester, setSemester] = useState("All");

  const fetchAttendance = async () => {
    try {
      const data = await getAttendance();

      setAttendance(data.attendance);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const filteredAttendance = attendance.filter((item) => {
    const matchesSearch = item.subject
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSemester =
      semester === "All" ||
      item.semester === Number(semester);

    return matchesSearch && matchesSemester;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-xl font-semibold">
            Loading Attendance...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">

        <AttendanceHeader
          setOpenModal={setOpenModal}
        />

        <AttendanceStats
          attendance={filteredAttendance}
        />

        {/* Search + Filter */}

        <div className="flex flex-col md:flex-row gap-4 my-6">

          <div className="flex-1">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />
          </div>

          <SemesterFilter
            semester={semester}
            setSemester={setSemester}
          />

        </div>

        <AttendanceTable
          attendance={filteredAttendance}
          refreshAttendance={fetchAttendance}
        />

        <AttendanceCharts
          attendance={filteredAttendance}
        />

        <AttendanceCalculator
          attendance={filteredAttendance}
        />

        <ExportButtons
          attendance={filteredAttendance}
        />

        <AddSubjectModal
          open={openModal}
          setOpen={setOpenModal}
          refreshAttendance={fetchAttendance}
        />

      </div>
    </DashboardLayout>
  );
}

export default Attendance;