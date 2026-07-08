import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Loader2,
  Calendar,
  Files,
  Home,
} from "lucide-react";

import toast from "react-hot-toast";

import { uploadPdf } from "../../services/pdfServices";

const PdfUpload = ({
  pdfs,
  selectedPdf,
  setSelectedPdf,
  searchTerm,
  loadPdfs,
}) => {
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const filteredPdfs = useMemo(() => {
    return pdfs.filter((pdf) =>
      pdf.originalName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [pdfs, searchTerm]);

  const handleChooseFile = () => {
    inputRef.current.click();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    try {
      setLoading(true);

      await uploadPdf(file);

      toast.success("PDF uploaded successfully.");

      await loadPdfs();

      e.target.value = "";
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-transparent">

      {/* Upload Section */}

      <div className="border-b border-slate-200/80 p-5 dark:border-white/10">

        <button
          onClick={handleChooseFile}
          disabled={loading}
          className="
            w-full
            premium-button-primary
          "
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2
                className="animate-spin"
                size={18}
              />
              Uploading...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Upload size={18} />
              Upload PDF
            </div>
          )}
        </button>

        <input
          hidden
          type="file"
          accept=".pdf"
          ref={inputRef}
          onChange={handleUpload}
        />

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-100 p-3 dark:bg-white/[0.06]">

          <Files
            size={18}
            className="text-cyan-400"
          />

          <div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Total Documents
            </p>

            <h3 className="font-bold text-slate-950 dark:text-white">
              {pdfs.length}
            </h3>

          </div>

        </div>

      </div>

      {/* PDF List */}

      <div className="flex-1 overflow-y-auto p-3 space-y-3">

        {filteredPdfs.length === 0 ? (
          <div className="mt-16 flex flex-col items-center px-4 text-center">

            <FileText
              size={60}
              className="text-slate-300 dark:text-slate-600"
            />

            <h3 className="mt-4 font-semibold text-slate-950 dark:text-white">
              No PDFs Yet
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Upload your first PDF to start
              chatting with AI.
            </p>

          </div>
        ) : (
          filteredPdfs.map((pdf) => (
            <button
              key={pdf._id}
              onClick={() =>
                setSelectedPdf(pdf)
              }
              className={`
                w-full
                rounded-2xl
                border
                p-4
                text-left
                transition-all
                duration-300
                ${
                  selectedPdf?._id === pdf._id
                    ? "border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/15"
                    : "border-slate-200/80 bg-white/65 hover:border-cyan-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.045] dark:hover:bg-white/[0.07]"
                }
              `}
            >

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-cyan-500/10 p-3">

                  <FileText
                    size={20}
                    className="text-cyan-400"
                  />

                </div>

                <div className="min-w-0 flex-1">

                  <h4 className="truncate font-semibold text-slate-900 dark:text-white">
                    {pdf.originalName}
                  </h4>

                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">

                    <Calendar size={14} />

                    {new Date(
                      pdf.createdAt
                    ).toLocaleDateString()}

                  </div>

                </div>

              </div>

            </button>
          ))
        )}

            </div>

      {/* Dashboard Button */}
{/* Dashboard Button */}

    <div className="border-t border-slate-200/80 px-4 pb-10 pt-3 dark:border-white/10">

      <button
        onClick={() => navigate("/dashboard")}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-slate-100
          px-4
          py-3
          font-semibold
          text-slate-700
          transition-all
          duration-300
          hover:bg-slate-950
          hover:text-white
          dark:bg-white/[0.07]
          dark:text-white
          dark:hover:bg-white/[0.12]
        "
      >
        <Home size={18} />
        Dashboard
      </button>

    </div>

    </div>
  );
};
  

export default PdfUpload;
