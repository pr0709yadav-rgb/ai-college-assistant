import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==============================
// Normal AI Chat
// ==============================
export const askGemini = async (userMessage) => {
  const prompt = `
You are AI College Assistant.
Help students with academics, coding, projects, exams and placements.

Student Question:
${userMessage}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};

// ==============================
// PDF Chat (RAG)
// ==============================
// ==============================
// PDF Chat (RAG)
// ==============================
export const askPdf = async (context, question) => {
  const prompt = `
You are an AI College Assistant.

Use ONLY the information provided in the PDF context.

Rules:
1. Do NOT use outside knowledge.
2. If the answer is not present in the context, reply exactly:
"I couldn't find that information in the uploaded PDF."

-----------------------
PDF Context

${context}

-----------------------
Question

${question}

Answer:
`;

  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      lastError = error;

      console.log(`Gemini Retry ${attempt}/3`);

      // Retry only for temporary server issues
      if (
        error.message.includes("503") ||
        error.message.includes("UNAVAILABLE")
      ) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      // Don't retry for other errors
      throw error;
    }
  }

  throw lastError;
};
// ==============================
// Generate Embeddings
// ==============================
export const getEmbedding = async (text) => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings[0].values;
};

