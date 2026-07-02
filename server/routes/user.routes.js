import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";

const router = express.Router();

// Get Profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// Update Profile
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

// Change Password
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;