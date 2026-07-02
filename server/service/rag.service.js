import PdfChunk from "../models/PdfChunk.js";
import { getEmbedding, askPdf } from "./gemini.service.js";

// ==============================
// Cosine Similarity
// ==============================
function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ==============================
// Search Relevant Chunks
// ==============================
export const searchRelevantChunks = async (pdfId, question) => {
  const questionEmbedding = await getEmbedding(question);

  const chunks = await PdfChunk.find({
    pdf: pdfId,
  });

  const rankedChunks = chunks.map((chunk) => ({
    ...chunk.toObject(),
    score: cosineSimilarity(
      questionEmbedding,
      chunk.embedding
    ),
  }));

  rankedChunks.sort((a, b) => b.score - a.score);

  return rankedChunks.slice(0, 5);
};

// ==============================
// Build Context
// ==============================
export const buildContext = (chunks) => {
  return chunks
    .map(
      (chunk, index) =>
        `Chunk ${index + 1}:\n${chunk.text}`
    )
    .join("\n\n=============================\n\n");
};

// ==============================
// Main RAG Function
// ==============================
export const askQuestion = async (pdfId, question) => {
  // Retrieve relevant chunks
  const chunks = await searchRelevantChunks(
    pdfId,
    question
  );

  if (!chunks.length) {
    return "No relevant information found in the uploaded PDF.";
  }

  // Create context
  const context = buildContext(chunks);

  // Ask Gemini using retrieved context
  const answer = await askPdf(context, question);

  return answer;
};