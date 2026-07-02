import { askGemini } from "../service/gemini.service.js";

// ======================================
// Coding Assistant
// ======================================

export const codingAssistant = async (req, res) => {
  try {
    const {
      language = "General",
      mode = "generate",
      question,
    } = req.body;

    // ------------------------
    // Validation
    // ------------------------

    if (!question?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    if (question.length > 3000) {
      return res.status(400).json({
        success: false,
        message: "Question is too long.",
      });
    }

    const supportedModes = [
      "generate",
      "debug",
      "explain",
      "optimize",
      "convert",
      "interview",
    ];

    if (!supportedModes.includes(mode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mode.",
      });
    }

    // ------------------------
    // Mode Prompt
    // ------------------------

    let modeInstruction = "";

    switch (mode) {
      case "debug":
        modeInstruction = `
Find every bug.
Explain why it happens.
Provide corrected code.
Mention best practices.
`;
        break;

      case "optimize":
        modeInstruction = `
Optimize the user's solution.
Reduce time complexity.
Reduce space complexity.
Explain improvements.
`;
        break;

      case "convert":
        modeInstruction = `
Convert the code into the requested language.
Keep functionality same.
Explain syntax differences.
`;
        break;

      case "explain":
        modeInstruction = `
Explain the concept in simple language.
Give examples.
Mention use cases.
`;
        break;

      case "interview":
        modeInstruction = `
Answer like a FAANG interviewer.
Provide ideal solution.
Mention follow-up interview questions.
`;
        break;

      default:
        modeInstruction = `
Generate clean production-ready code.
Explain every important step.
`;
    }

    // ------------------------
    // Prompt
    // ------------------------

    const prompt = `
You are a Senior Software Engineer and Programming Mentor.

Programming Language:
${language}

Assistant Mode:
${mode}

Instructions:
${modeInstruction}

User Question:
${question}

Return your answer in Markdown using exactly this format.

# Code

Provide complete code.

# Explanation

Explain the code in detail.

# Time Complexity

# Space Complexity

# Best Practices

# Common Mistakes

# Interview Tips

# Related Questions
`;

    const reply = await askGemini(prompt);

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to generate response.",
    });

  }
};