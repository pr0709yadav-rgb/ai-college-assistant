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

export default mongoose.model("PdfChunk", pdfChunkSchema);