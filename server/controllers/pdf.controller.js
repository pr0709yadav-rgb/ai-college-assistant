import fs from "fs";

import Pdf from "../models/Pdf.js";
import PdfChunk from "../models/PdfChunk.js";

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

    // Extract text from PDF
    const extractedText = await extractPdfText(req.file.path);

    // Save PDF details
    const pdf = await Pdf.create({
      user: req.user._id,
      originalName: req.file.originalname,
      filename: req.file.filename,
      extractedText,
    });

    // Split into chunks
    const chunks = chunkText(extractedText);

    // Generate embedding for every chunk
    for (let i = 0; i < chunks.length; i++) {
      const embedding = await getEmbedding(chunks[i]);

      await PdfChunk.create({
        pdf: pdf._id,
        text: chunks[i],
        embedding,
        chunkIndex: i,
      });
    }

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

    // Check ownership
    if (pdf.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delete uploaded file
    if (fs.existsSync(`uploads/${pdf.filename}`)) {
      fs.unlinkSync(`uploads/${pdf.filename}`);
    }

    // Delete all chunks
    await PdfChunk.deleteMany({
      pdf: pdf._id,
    });

    // Delete PDF document
    await pdf.deleteOne();

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