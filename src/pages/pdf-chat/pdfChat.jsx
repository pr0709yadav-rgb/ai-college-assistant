import { useEffect, useState } from "react";

import PdfToolbar from "../../components/pdfChat/PdfToolbar";
import PdfUpload from "../../components/pdfChat/PdfUpload";
import ChatWindow from "../../components/pdfChat/ChatWindow";

import { getUserPdfs } from "../../services/pdfServices";

const PdfChat = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ==========================
  // Load PDFs
  // ==========================

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
    <div className="h-screen bg-slate-950 text-white overflow-hidden">

      <div className="h-full flex flex-col p-4 gap-4">

        {/* ================= Toolbar ================= */}

        <PdfToolbar
          pdfs={pdfs}
          selectedPdf={selectedPdf}
          setSelectedPdf={setSelectedPdf}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loadPdfs={loadPdfs}
        />

        {/* ================= Main Layout ================= */}

        <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden">

          {/* ================= PDF Library ================= */}

          <div className="col-span-12 lg:col-span-3 xl:col-span-2 rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">

            <div className="border-b border-slate-700 px-5 py-4">

              <h2 className="text-lg font-bold">
                📚 PDF Library
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Upload and manage your PDFs
              </p>

            </div>

            <div className="h-[calc(100%-76px)] overflow-y-auto">

              <PdfUpload
                pdfs={pdfs}
                selectedPdf={selectedPdf}
                setSelectedPdf={setSelectedPdf}
                searchTerm={searchTerm}
                loadPdfs={loadPdfs}
              />

            </div>

          </div>

          {/* ================= PDF Chat ================= */}

          <div className="col-span-12 lg:col-span-9 xl:col-span-10 rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">

            <ChatWindow
              selectedPdf={selectedPdf}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default PdfChat;