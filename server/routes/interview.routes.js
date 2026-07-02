import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  startInterview,
  submitAnswer,
} from "../controllers/interview.controller.js";

const router = express.Router();

// ==============================
// Start Interview
// ==============================

router.post(
  "/start",
  authMiddleware,
  startInterview
);

// ==============================
// Submit Answer
// ==============================

router.post(
  "/answer",
  authMiddleware,
  submitAnswer
);

export default router;