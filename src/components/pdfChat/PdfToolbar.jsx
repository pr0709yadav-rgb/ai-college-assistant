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
    <div className="surface rounded-2xl px-5 py-4">

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
              className="premium-input w-full pl-11 sm:w-80"
            />

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 dark:bg-white/[0.06]">

            <FileText
              size={18}
              className="text-cyan-400"
            />

            <span className="text-sm text-slate-600 dark:text-slate-300">
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

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Selected PDF
                </p>

                <p className="max-w-[220px] truncate text-sm font-medium text-slate-900 dark:text-white">
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
              bg-slate-100
              px-4
              py-3
              text-slate-700
              transition-all
              hover:-translate-y-0.5
              hover:bg-slate-950
              hover:text-white
              dark:bg-white/[0.06]
              dark:text-white
              dark:hover:bg-white/[0.12]
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
              transition-all
              hover:-translate-y-0.5
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
