import express from "express";

import protect from "../middleware/auth.middleware.js";

import { generateNotes } from "../controllers/notes.controller.js";

const router = express.Router();

router.post(
  "/generate",
  protect,
  generateNotes
);

export default router;