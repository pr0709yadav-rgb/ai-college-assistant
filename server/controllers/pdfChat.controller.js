import mongoose from "mongoose";
import Pdf from "../models/pdf.js";
import { askQuestion } from "../service/rag.service.js";

export const chatWithPdf = async (req, res) => {
  try {
    const { pdfId, question } = req.body;

    // ============================
    // Validation
    // ============================
    if (!pdfId || !question) {
      return res.status(400).json({
        success: false,
        message: "pdfId and question are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(pdfId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF ID.",
      });
    }

    // ============================
    // Check PDF Exists & Ownership
    // ============================
    const pdf = await Pdf.findOne({
      _id: pdfId,
      user: req.user._id, // ✅ Fixed here
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found.",
      });
    }

    // ============================
    // Generate Answer
    // ============================
    const answer = await askQuestion(pdfId, question);

    return res.status(200).json({
      success: true,
      pdfId,
      question,
      answer,
    });

  } catch (error) {
    console.error("PDF Chat Error:", error);

    // Gemini API Busy
    if (
      error.message.includes("503") ||
      error.message.includes("UNAVAILABLE")
    ) {
      return res.status(503).json({
        success: false,
        message:
          "Gemini API is temporarily busy. Please try again in a few seconds.",
      });
    }

    // Gemini Rate Limit
    if (
      error.message.includes("429") ||
      error.message.includes("RESOURCE_EXHAUSTED")
    ) {
      return res.status(429).json({
        success: false,
        message:
          "Gemini API rate limit exceeded. Please wait and try again.",
      });
    }

    // Embedding Error
    if (
      error.message.includes("embedding") ||
      error.message.includes("embedContent")
    ) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate embeddings.",
      });
    }

    // Generic Error
    return res.status(500).json({
      success: false,
      message: "Failed to process your question.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};