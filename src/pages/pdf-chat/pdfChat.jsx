import { useEffect, useState } from "react";

import PdfToolbar from "../../components/pdfChat/PdfToolbar";
import PdfUpload from "../../components/pdfChat/PdfUpload";
import ChatWindow from "../../components/pdfChat/ChatWindow";

import { getUserPdfs } from "../../services/pdfServices";

const PdfChat = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="app-bg h-screen overflow-hidden text-slate-950 dark:text-white">
      <div className="flex h-full flex-col gap-4 p-4">
        <PdfToolbar
          pdfs={pdfs}
          selectedPdf={selectedPdf}
          setSelectedPdf={setSelectedPdf}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loadPdfs={loadPdfs}
        />

        <div className="grid flex-1 grid-cols-12 gap-4 overflow-hidden">
          <div className="premium-card col-span-12 overflow-hidden lg:col-span-3 xl:col-span-3 2xl:col-span-2">
            <div className="border-b border-slate-200/80 px-5 py-4 dark:border-white/10">
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                PDF Library
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
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

          <div className="premium-card col-span-12 overflow-hidden lg:col-span-9 xl:col-span-9 2xl:col-span-10">
            <ChatWindow selectedPdf={selectedPdf} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfChat;
