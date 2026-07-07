import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import Resume from "../models/resume.js";
import Activity from "../models/activity.js";

import { askGemini } from "../service/gemini.service.js";

// =====================================
// Extract PDF Text
// =====================================

const extractPdfText = async (filePath) => {
  const data = new Uint8Array(
    fs.readFileSync(filePath)
  );

  const pdf = await pdfjsLib.getDocument({
    data,
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content = await page.getTextContent();

    text +=
      content.items
        .map((item) => item.str)
        .join(" ") + "\n";
  }

  return text;
};

// =====================================
// Analyze Resume
// =====================================

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required.",
      });
    }

    const resumeText = await extractPdfText(
      req.file.path
    );

    const prompt = `
You are an expert ATS Resume Reviewer.

Analyze the following resume.

Return ONLY valid JSON.

Do NOT write markdown.

Do NOT use \`\`\`.

Return exactly in this format:

{
  "resumeScore": 0,
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:

${resumeText}
`;

    const aiResponse = await askGemini(prompt);

    let analysis;

    try {
      analysis = JSON.parse(aiResponse);
    } catch {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON.",
      });
    }

    // =====================================
    // Save Resume Analysis
    // =====================================

    const existingResume = await Resume.findOne({
      user: req.user._id,
    });

    if (existingResume) {
      existingResume.resumeScore =
        analysis.resumeScore;

      existingResume.atsScore =
        analysis.atsScore;

      existingResume.strengths =
        analysis.strengths;

      existingResume.weaknesses =
        analysis.weaknesses;

      existingResume.missingSkills =
        analysis.missingSkills;

      existingResume.suggestions =
        analysis.suggestions;

      await existingResume.save();
    } else {
      await Resume.create({
        user: req.user._id,

        resumeScore:
          analysis.resumeScore,

        atsScore:
          analysis.atsScore,

        strengths:
          analysis.strengths,

        weaknesses:
          analysis.weaknesses,

        missingSkills:
          analysis.missingSkills,

        suggestions:
          analysis.suggestions,
      });
    }

    // =====================================
    // Save Activity
    // =====================================

    await Activity.create({
      user: req.user._id,
      module: "Resume",
      action: "Analyzed Resume",
    });

    res.status(200).json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};