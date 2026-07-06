import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  addSubject,
  getAttendance,
  updateSubject,
  deleteSubject,
  markPresent,
  markAbsent,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  addSubject
);

router.get(
  "/",
  authMiddleware,
  getAttendance
);

router.put(
  "/:id",
  authMiddleware,
  updateSubject
);

router.delete(
  "/:id",
  authMiddleware,
  deleteSubject
);

router.patch(
  "/present/:id",
  authMiddleware,
  markPresent
);

router.patch(
  "/absent/:id",
  authMiddleware,
  markAbsent
);

export default router;