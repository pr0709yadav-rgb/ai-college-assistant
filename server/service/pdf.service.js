import fs from "fs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractPdfText = async (filePath) => {
  try {
    // Read the PDF into a Uint8Array
    const data = new Uint8Array(fs.readFileSync(filePath));

    const loadingTask = getDocument({ data });
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map(item => item.str)
        .join(" ");

      fullText += pageText + "\n";
    }

    return fullText;

  } catch (error) {
    throw error;
  }
};
