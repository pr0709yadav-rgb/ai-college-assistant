import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import PdfToolbar from "../../components/pdfChat/PdfToolbar";
import PdfUpload from "../../components/pdfChat/PdfUpload";
import PdfViewer from "../../components/pdfChat/PdfViewer";
import ChatWindow from "../../components/pdfChat/ChatWindow";

import { getUserPdfs } from "../../services/pdfServices";

const PdfChat = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ===========================
  // Load PDFs
  // ===========================

  const loadPdfs = async () => {
    try {
      const res = await getUserPdfs();

      setPdfs(res.pdfs || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPdfs();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-120px)]">

        <PdfToolbar
          pdfs={pdfs}
          setPdfs={setPdfs}
          selectedPdf={selectedPdf}
          setSelectedPdf={setSelectedPdf}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loadPdfs={loadPdfs}
        />

        <div className="flex flex-1 gap-4 mt-4 overflow-hidden">

          {/* Left */}

          <div className="w-72 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">

            <PdfUpload
              pdfs={pdfs}
              setPdfs={setPdfs}
              selectedPdf={selectedPdf}
              setSelectedPdf={setSelectedPdf}
              searchTerm={searchTerm}
              loadPdfs={loadPdfs}
            />

          </div>

          {/* Center */}

          <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">

            <PdfViewer
              selectedPdf={selectedPdf}
            />

          </div>

          {/* Right */}

          <div className="w-[380px] bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">

            <ChatWindow
              selectedPdf={selectedPdf}
            />

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default PdfChat;