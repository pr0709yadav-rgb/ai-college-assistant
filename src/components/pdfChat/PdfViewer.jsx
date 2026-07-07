import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { getPdfUrl } from "../../services/pdfServices";

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
  Maximize2,
  Download,
  ArrowLeft,
  Home,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewer = ({ selectedPdf }) => {
  const navigate = useNavigate();

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.25);

  useEffect(() => {
    setPageNumber(1);
    setScale(1.25);
  }, [selectedPdf]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!selectedPdf) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-cyan-500/10">
            <FileText
              size={48}
              className="text-cyan-400"
            />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white">
            PDF Not Found
          </h2>

          <p className="mt-3 text-slate-400">
            Please select a PDF first.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-slate-950">

      {/* ================= Header ================= */}

      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">

        <div className="flex items-center gap-3">

          {/* Back Button */}

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-white transition hover:bg-cyan-600"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* Dashboard Button */}

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-white transition hover:bg-cyan-700"
          >
            <Home size={18} />
            Dashboard
          </button>

          {/* PDF Name */}

          <div className="ml-3">

            <h2 className="max-w-lg truncate text-lg font-semibold text-white">
              {selectedPdf.originalName}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Page {pageNumber} of {numPages || "--"}
            </p>

          </div>

        </div>

        {/* Toolbar */}

        <div className="flex items-center gap-2">

          <button
            onClick={() =>
              setScale((s) => Math.max(0.8, s - 0.1))
            }
            className="rounded-xl bg-slate-800 p-3 text-white transition hover:bg-cyan-600"
          >
            <ZoomOut size={18} />
          </button>

          <div className="min-w-[80px] rounded-xl bg-slate-800 px-4 py-3 text-center font-semibold text-white">
            {(scale * 100).toFixed(0)}%
          </div>

          <button
            onClick={() =>
              setScale((s) => Math.min(3, s + 0.1))
            }
            className="rounded-xl bg-slate-800 p-3 text-white transition hover:bg-cyan-600"
          >
            <ZoomIn size={18} />
          </button>

          <button
            onClick={() => {
              const element = document.documentElement;

              if (element.requestFullscreen) {
                element.requestFullscreen();
              }
            }}
            className="rounded-xl bg-slate-800 p-3 text-white transition hover:bg-cyan-600"
          >
            <Maximize2 size={18} />
          </button>

          <button
            onClick={() =>
              window.open(
                getPdfUrl(selectedPdf._id),
                "_blank"
              )
            }
            className="rounded-xl bg-slate-800 p-3 text-white transition hover:bg-cyan-600"
          >
            <Download size={18} />
          </button>

        </div>

      </div>

      {/* ================= PDF ================= */}

      <div className="flex-1 overflow-auto bg-[#0b1220] p-10">

        <div className="mx-auto w-fit rounded-2xl bg-white p-4 shadow-2xl">

          <Document
            file={{
              url: getPdfUrl(selectedPdf._id),
              httpHeaders: {
                Authorization: `Bearer ${localStorage.getItem(
                  "token"
                )}`,
              },
            }}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="p-20 text-center text-black">
                Loading PDF...
              </div>
            }
            error={
              <div className="p-20 text-center text-red-500">
                Failed to load PDF.
              </div>
            }
          > <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>

        </div>

      </div>

      {/* ================= Footer ================= */}

      <div className="border-t border-slate-800 bg-slate-900 px-6 py-4">

        <div className="flex items-center justify-center gap-6">

          <button
            disabled={pageNumber <= 1}
            onClick={() =>
              setPageNumber((prev) => prev - 1)
            }
            className="
              rounded-xl
              bg-slate-800
              p-3
              text-white
              transition
              hover:bg-cyan-600
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronLeft size={20} />
          </button>

          <div className="rounded-xl bg-cyan-600 px-6 py-2 font-semibold text-white shadow-lg">
            {pageNumber} / {numPages || "--"}
          </div>

          <button
            disabled={pageNumber >= numPages}
            onClick={() =>
              setPageNumber((prev) => prev + 1)
            }
            className="
              rounded-xl
              bg-slate-800
              p-3
              text-white
              transition
              hover:bg-cyan-600
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default PdfViewer;