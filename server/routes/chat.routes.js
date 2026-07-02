import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  chatWithAI,
  getChatHistory,
  deleteChatHistory,
} from "../controllers/chat.controller.js";

const router = express.Router();

// Send Message
router.post("/", authMiddleware, chatWithAI);

// Get History
router.get("/history", authMiddleware, getChatHistory);

// Delete History
router.delete("/history", authMiddleware, deleteChatHistory);

export default router;