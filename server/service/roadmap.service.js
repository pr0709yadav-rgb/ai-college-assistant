import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateRoadmapAI = async (
  goal,
  level,
  duration
) => {
  const prompt = `
You are an expert software mentor.

Generate a learning roadmap.

Goal: ${goal}
Level: ${level}
Duration: ${duration}

Return ONLY valid JSON in this format:

{
  "roadmap": [
    {
      "week": 1,
      "title": "Week Title",
      "tasks": [
        {
          "task": "Task Name",
          "completed": false
        }
      ]
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let text = response.text;

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
};