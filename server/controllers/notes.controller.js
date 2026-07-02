import Pdf from "../models/pdf.js";
import PdfChunk from "../models/PdfChunk.js";
import { askPdf } from "../service/gemini.service.js";

export const generateNotes = async (req, res) => {
  try {
    const { pdfId } = req.body;

    if (!pdfId) {
      return res.status(400).json({
        success: false,
        message: "PDF ID is required.",
      });
    }

    const pdf = await Pdf.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found.",
      });
    }

    const chunks = await PdfChunk.find({
      pdf: pdfId,
    });

    const context = chunks
      .map((chunk) => chunk.text)
      .join("\n\n");

    const notes = await askPdf(
      context,
      `
Generate well-structured study notes from this PDF.

Rules:
- Use headings.
- Use bullet points.
- Highlight important concepts.
- Keep the notes concise and exam-oriented.
`
    );

    res.json({
      success: true,
      notes,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate notes.",
    });
  }
};