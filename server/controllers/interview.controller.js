import { askGemini } from "../service/gemini.service.js";

// =======================================
// Start Interview
// =======================================

export const startInterview = async (req, res) => {
  try {
    const { type, role } = req.body;

    if (!type || !role) {
      return res.status(400).json({
        success: false,
        message: "Interview type and role are required.",
      });
    }

    const prompt = `
You are an expert interviewer.

Interview Type:
${type}

Job Role:
${role}

Generate ONLY ONE interview question.

Rules:
- Ask only ONE question.
- Don't explain anything.
- Don't number the question.
`;

    const question = await askGemini(prompt);

    res.status(200).json({
      success: true,
      question,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// =======================================
// Submit Answer
// =======================================

export const submitAnswer = async (req, res) => {

  try {

    const {
      question,
      answer,
      role,
      type,
    } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required.",
      });
    }

    const prompt = `
You are an expert interviewer.

Interview Type:
${type}

Job Role:
${role}

Question:
${question}

Candidate Answer:
${answer}

Evaluate the candidate.

Return ONLY valid JSON.

No markdown.
No explanation.
No \`\`\`.

Format:

{
  "score":8,
  "feedback":"Feedback here",
  "nextQuestion":"Next interview question"
}
`;

    const response = await askGemini(prompt);

    console.log("========== GEMINI RESPONSE ==========");
    console.log(response);

    // Remove markdown if Gemini returns it
    let cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON object
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({
        success: false,
        message: "Gemini did not return valid JSON.",
      });
    }

    cleaned = jsonMatch[0];

    console.log("========== CLEANED JSON ==========");
    console.log(cleaned);

    let result;

    try {

      result = JSON.parse(cleaned);

    } catch (err) {

      console.log("========== JSON PARSE ERROR ==========");
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Invalid AI response.",
      });

    }

    res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {

    console.log("========== INTERVIEW ERROR ==========");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};