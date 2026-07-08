import jsPDF from "jspdf";
import { Download } from "lucide-react";

function ExportRoadmap({ roadmap }) {
  if (!roadmap.length) return null;

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);

    pdf.text("AI Learning Roadmap", 20, 20);

    pdf.setFont("helvetica", "normal");

    let y = 35;

    roadmap.forEach((week) => {

      if (y > 260) {
        pdf.addPage();
        y = 20;
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(15);

      pdf.text(
        `Week ${week.week}: ${week.title}`,
        20,
        y
      );

      y += 10;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);

      week.tasks.forEach((task) => {

        if (y > 280) {
          pdf.addPage();
          y = 20;
        }

        pdf.text(
          `• ${task.task}`,
          25,
          y
        );

        y += 7;

      });

      y += 8;

    });

    pdf.save("AI-Roadmap.pdf");
  };

  return (
    <div className="mt-8 flex justify-end">

      <button
        onClick={downloadPDF}
        className="
          inline-flex
          items-center
          gap-2

          rounded-xl

          bg-cyan-500
          hover:bg-cyan-600

          text-white

          px-6
          py-3

          font-semibold

          shadow-lg
          shadow-cyan-500/20

          transition-all
          duration-300

          hover:-translate-y-1
        "
      >
        <Download size={18} />

        Download PDF

      </button>

    </div>
  );
}

export default ExportRoadmap;