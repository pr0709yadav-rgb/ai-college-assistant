import express from "express";

import upload from "../middleware/upload.middleware.js";
import protect from "../middleware/auth.middleware.js";
import { chatWithPdf } from "../controllers/pdfChat.controller.js";

import {
  uploadPdf,
  getUserPdfs,
  deletePdf,
} from "../controllers/pdf.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadPdf
);

router.get(
  "/",
  protect,
  getUserPdfs
);

router.delete(
  "/:id",
  protect,
  deletePdf
);
router.post(
  "/chat",
  protect,
  chatWithPdf
);

export default router;