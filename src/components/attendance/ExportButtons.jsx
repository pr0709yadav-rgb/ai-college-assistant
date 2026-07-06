import jsPDF from "jspdf";
import * as XLSX from "xlsx";

function ExportButtons({
  attendance,
}) {

  const exportPDF = () => {

    const pdf = new jsPDF();

    pdf.setFontSize(18);

    pdf.text(
      "Attendance Report",
      20,
      20
    );

    let y = 40;

    attendance.forEach((item) => {

      const total =
        item.present +
        item.absent;

      const percentage =
        total === 0
          ? 0
          : (
              (item.present /
                total) *
              100
            ).toFixed(1);

      pdf.text(
        `${item.subject}
Present:${item.present}
Absent:${item.absent}
Attendance:${percentage}%`,
        20,
        y
      );

      y += 25;

    });

    pdf.save("Attendance_Report.pdf");

  };

  const exportExcel = () => {

    const data = attendance.map(
      (item) => ({
        Subject: item.subject,

        Faculty: item.faculty,

        Present: item.present,

        Absent: item.absent,

        Total:
          item.present +
          item.absent,

        Attendance:
          (
            (item.present /
              (item.present +
                item.absent || 1)) *
            100
          ).toFixed(1) + "%",
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Attendance"
    );

    XLSX.writeFile(
      workbook,
      "Attendance_Report.xlsx"
    );

  };

  return (
    <div className="flex gap-4 mt-8">

      <button
        onClick={exportPDF}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
      >
        Download PDF
      </button>

      <button
        onClick={exportExcel}
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
      >
        Download Excel
      </button>

    </div>
  );
}

export default ExportButtons;