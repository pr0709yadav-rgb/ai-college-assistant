import express from "express";

import upload from "../middleware/upload.middleware.js";
import protect from "../middleware/auth.middleware.js";

import {
  uploadPdf,
  getUserPdfs,
  deletePdf,
  viewPdf,
} from "../controllers/pdf.controller.js";

import {
  chatWithPdf,
} from "../controllers/pdfChat.controller.js";

const router = express.Router();

// ==============================
// Upload PDF
// ==============================

router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadPdf
);

// ==============================
// Get User PDFs
// ==============================

router.get(
  "/",
  protect,
  getUserPdfs
);

// ==============================
// Chat With PDF
// ==============================

router.post(
  "/chat",
  protect,
  chatWithPdf
);

// ==============================
// View PDF
// ==============================

router.get(
  "/view/:id",
  protect,
  viewPdf
);

// ==============================
// Delete PDF
// ==============================

router.delete(
  "/:id",
  protect,
  deletePdf
);

export default router;