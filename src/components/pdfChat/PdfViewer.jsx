import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
} from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF Worker (Vite)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewer = ({ selectedPdf }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    setPageNumber(1);
    setScale(1.2);
  }, [selectedPdf]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!selectedPdf) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400">

        <FileText size={70} />

        <h2 className="mt-5 text-2xl font-semibold">
          No PDF Selected
        </h2>

        <p className="mt-2 text-center max-w-sm">
          Upload a PDF or select one from the left panel to preview it.
        </p>

      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">

      {/* Header */}

      <div className="border-b border-slate-700 p-4 flex items-center justify-between">

        <div>

          <h2 className="text-white font-semibold truncate max-w-md">
            {selectedPdf.originalName}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Page {pageNumber} / {numPages || "-"}
          </p>

        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() =>
              setScale((prev) => Math.max(0.8, prev - 0.2))
            }
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            <ZoomOut size={18} />
          </button>

          <span className="text-white w-14 text-center">
            {(scale * 100).toFixed(0)}%
          </span>

          <button
            onClick={() =>
              setScale((prev) => Math.min(3, prev + 0.2))
            }
            className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            <ZoomIn size={18} />
          </button>

        </div>

      </div>

      {/* Viewer */}

      <div className="flex-1 overflow-auto flex justify-center bg-slate-900 p-5">

        <Document
          file={`http://localhost:5000/uploads/${selectedPdf.filename}`}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <p className="text-white">
              Loading PDF...
            </p>
          }
          error={
            <p className="text-red-400">
              Failed to load PDF.
            </p>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-700 p-4 flex items-center justify-center gap-5">

        <button
          disabled={pageNumber <= 1}
          onClick={() =>
            setPageNumber((prev) => prev - 1)
          }
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="text-white font-medium">
          {pageNumber} / {numPages || "-"}
        </span>

        <button
          disabled={pageNumber >= numPages}
          onClick={() =>
            setPageNumber((prev) => prev + 1)
          }
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40"
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </div>
  );
};

export default PdfViewer;