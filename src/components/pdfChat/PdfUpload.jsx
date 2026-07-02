import { useMemo, useRef, useState } from "react";
import {
  Upload,
  FileText,
  Loader2,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  uploadPdf,
} from "../../services/pdfServices";

const PdfUpload = ({
  pdfs,
  selectedPdf,
  setSelectedPdf,
  searchTerm,
  loadPdfs,
}) => {
  const inputRef = useRef(null);

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
      toast.error("Please select a PDF file.");
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
    <div className="h-full flex flex-col">

      {/* Upload Button */}

      <div className="p-5 border-b border-slate-700">

        <button
          onClick={handleChooseFile}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-lg py-3 text-white flex items-center justify-center gap-2 transition"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={18} />
              Upload PDF
            </>
          )}
        </button>

        <input
          hidden
          type="file"
          accept=".pdf"
          ref={inputRef}
          onChange={handleUpload}
        />

      </div>

      {/* PDF List */}

      <div className="flex-1 overflow-y-auto">

        {filteredPdfs.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16">

            <FileText
              size={60}
              className="text-slate-500"
            />

            <p className="mt-4 text-slate-400">
              No PDFs Uploaded
            </p>

          </div>
        ) : (
          filteredPdfs.map((pdf) => (
            <div
              key={pdf._id}
              onClick={() =>
                setSelectedPdf(pdf)
              }
              className={`cursor-pointer p-4 border-b border-slate-700 transition ${
                selectedPdf?._id === pdf._id
                  ? "bg-cyan-600"
                  : "hover:bg-slate-700"
              }`}
            >
              <div className="flex gap-3">

                <FileText className="text-cyan-400" />

                <div className="flex-1">

                  <p className="text-white text-sm break-all">
                    {pdf.originalName}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(
                      pdf.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default PdfUpload;