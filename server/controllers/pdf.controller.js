import fs from "fs";

import Pdf from "../models/pdf.js";
import PdfChunk from "../models/PdfChunk.js";
import Activity from "../models/activity.js";

import { extractPdfText } from "../service/pdf.service.js";
import { chunkText } from "../utils/chunkText.js";
import { getEmbedding } from "../service/gemini.service.js";

// =====================================
// Upload PDF
// =====================================

export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF",
      });
    }

    // Extract text
    const extractedText = await extractPdfText(req.file.path);

    // Save PDF
    const pdf = await Pdf.create({
      user: req.user._id,
      originalName: req.file.originalname,
      filename: req.file.filename,
      extractedText,
    });

    // Split into chunks
    const chunks = chunkText(extractedText);

    // Generate embeddings
    for (let i = 0; i < chunks.length; i++) {
      const embedding = await getEmbedding(chunks[i]);

      await PdfChunk.create({
        pdf: pdf._id,
        text: chunks[i],
        embedding,
        chunkIndex: i,
      });
    }

    // ==============================
    // Save Activity
    // ==============================

    await Activity.create({
      user: req.user._id,
      module: "PDF Chat",
      action: `Uploaded ${req.file.originalname}`,
    });

    res.status(201).json({
      success: true,
      message: "PDF uploaded and indexed successfully",
      pdfId: pdf._id,
      chunks: chunks.length,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =====================================
// Get User PDFs
// =====================================

export const getUserPdfs = async (req, res) => {
  try {

    const pdfs = await Pdf.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: pdfs.length,
      pdfs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =====================================
// Delete PDF
// =====================================

export const deletePdf = async (req, res) => {
  try {

    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    if (pdf.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (fs.existsSync(`uploads/${pdf.filename}`)) {
      fs.unlinkSync(`uploads/${pdf.filename}`);
    }

    await PdfChunk.deleteMany({
      pdf: pdf._id,
    });

    await pdf.deleteOne();

    // ==============================
    // Save Activity
    // ==============================

    await Activity.create({
      user: req.user._id,
      module: "PDF Chat",
      action: `Deleted ${pdf.originalName}`,
    });

    res.status(200).json({
      success: true,
      message: "PDF deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

  // =====================================
// View PDF
// =====================================

export const viewPdf = async (req, res) => {
  try {

    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    if (pdf.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.sendFile(pdf.filename, {
      root: "uploads",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
