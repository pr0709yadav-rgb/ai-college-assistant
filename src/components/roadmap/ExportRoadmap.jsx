import jsPDF from "jspdf";

function ExportRoadmap({
  roadmap,
}) {

  if (!roadmap.length) return null;

  const downloadPDF = () => {

    const pdf = new jsPDF();

    pdf.setFontSize(20);

    pdf.text(
      "AI Learning Roadmap",
      20,
      20
    );

    let y = 40;

    roadmap.forEach((week) => {

      pdf.setFontSize(15);

      pdf.text(
        `Week ${week.week}: ${week.title}`,
        20,
        y
      );

      y += 8;

      pdf.setFontSize(11);

      week.tasks.forEach((task) => {

        pdf.text(
          `• ${task.task}`,
          25,
          y
        );

        y += 7;

      });

      y += 8;

      if (y > 270) {

        pdf.addPage();

        y = 20;

      }

    });

    pdf.save("Roadmap.pdf");

  };

  return (

    <button
      onClick={downloadPDF}
      className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
    >
      Download PDF
    </button>

  );

}

export default ExportRoadmap;