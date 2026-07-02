import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  codingAssistant,
} from "../controllers/coding.controller.js";

const router = express.Router();

// ==============================
// Coding Assistant
// ==============================

router.post(
  "/",
  authMiddleware,
  codingAssistant
);

export default router;