import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Pdf =
  mongoose.models.Pdf ||
  mongoose.model("Pdf", pdfSchema);

export default Pdf;