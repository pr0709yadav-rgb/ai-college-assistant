import {
  Search,
  RefreshCw,
  Trash2,
  FileText,
  Sparkles,
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
      "Are you sure you want to delete this PDF?"
    );

    if (!ok) return;

    try {
      await deletePdf(selectedPdf._id);

      await loadPdfs();

      setSelectedPdf(null);

      toast.success("PDF deleted successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Delete failed."
      );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 shadow-xl">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* Left */}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search your PDFs..."
              className="
                w-full
                sm:w-80
                rounded-xl
                bg-slate-950
                border
                border-slate-700
                py-3
                pl-11
                pr-4
                text-white
                placeholder:text-slate-500
                outline-none
                transition
                focus:border-cyan-500
                focus:ring-2
                focus:ring-cyan-500/20
              "
            />

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3">

            <FileText
              size={18}
              className="text-cyan-400"
            />

            <span className="text-sm text-slate-300">
              {pdfs.length} Document{pdfs.length !== 1 && "s"}
            </span>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">

          {selectedPdf && (
            <div className="flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <div>

                <p className="text-xs text-slate-400">
                  Selected PDF
                </p>

                <p className="max-w-[220px] truncate text-sm font-medium text-white">
                  {selectedPdf.originalName}
                </p>

              </div>

            </div>
          )}

          <button
            onClick={loadPdfs}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-slate-800
              px-4
              py-3
              text-white
              transition
              hover:bg-cyan-600
            "
          >
            <RefreshCw size={18} />

            <span className="hidden sm:block">
              Refresh
            </span>

          </button>

          <button
            onClick={handleDelete}
            disabled={!selectedPdf}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-4
              py-3
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Trash2 size={18} />

            <span className="hidden sm:block">
              Delete
            </span>

          </button>

        </div>

      </div>

    </div>
  );
};

export default PdfToolbar;