import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  analyzeResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

// Analyze Resume

router.post(
  "/analyze",
  authMiddleware,
  upload.single("resume"),
  analyzeResume
);

export default router;