import mongoose from "mongoose";

const pdfChunkSchema = new mongoose.Schema(
  {
    pdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pdf",
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    embedding: {
      type: [Number],
      default: [],
    },

    chunkIndex: Number,
  },
  {
    timestamps: true,
  }
);

const PdfChunk =
  mongoose.models.PdfChunk ||
  mongoose.model("PdfChunk", pdfChunkSchema);

export default PdfChunk;