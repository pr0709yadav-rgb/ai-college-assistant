import {
  Search,
  RefreshCw,
  Trash2,
  FileText,
} from "lucide-react";

import toast from "react-hot-toast";

import { deletePdf } from "../../services/pdfServices";

const PdfToolbar = ({
  pdfs,
  setSelectedPdf,
  selectedPdf,
  searchTerm,
  setSearchTerm,
  loadPdfs,
}) => {
  const handleDelete = async () => {
    if (!selectedPdf) {
      return toast.error("Select a PDF first.");
    }

    const ok = window.confirm(
      "Delete this PDF?"
    );
    const data = await generateNotes(
    selectedPdf._id
    );
    if (!ok) return;

    try {
      await deletePdf(selectedPdf._id);

      await loadPdfs();

      setSelectedPdf(null);

      toast.success("PDF deleted successfully.");
    } catch (error) {
      toast.error(error.message || "Delete failed.");    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex justify-between items-center">

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search PDFs..."
            className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 w-72 text-white outline-none focus:border-indigo-500"
          />

        </div>

        <span className="text-slate-400">
          {pdfs.length} PDF(s)
        </span>

      </div>

      <div className="flex items-center gap-3">

        {selectedPdf && (
          <div className="flex items-center gap-2 text-white">

            <FileText
              size={18}
              className="text-indigo-400"
            />

            <span className="max-w-[220px] truncate">
              {selectedPdf.originalName}
            </span>

          </div>
        )}

        <button
          onClick={loadPdfs}
          className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg"
        >
          <RefreshCw
            size={18}
            className="text-white"
          />
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
        >
          <Trash2
            size={18}
            className="text-white"
          />
        </button>

      </div>

    </div>
  );
};

export default PdfToolbar;