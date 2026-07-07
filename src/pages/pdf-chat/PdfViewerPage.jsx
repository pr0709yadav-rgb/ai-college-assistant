import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PdfViewer from "../../components/pdfChat/PdfViewer";

import { getUserPdfs } from "../../services/pdfServices";

const PdfViewerPage = () => {
  const { id } = useParams();

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPdf();
  }, [id]);

  const loadPdf = async () => {
    try {
      setLoading(true);

      const res = await getUserPdfs();

      const pdf = res.pdfs.find(
        (item) => item._id === id
      );

      setSelectedPdf(pdf || null);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading PDF...
      </div>
    );
  }

  return (
    <PdfViewer
      selectedPdf={selectedPdf}
    />
  );
};

export default PdfViewerPage;