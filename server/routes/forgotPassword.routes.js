import express from "express";

import {
  sendOTP,
  verifyOTP,
  resetPassword,
} from "../controllers/forgotPassword.controller.js";

const router = express.Router();

// Send OTP
router.post(
  "/send-otp",
  sendOTP
);

// Verify OTP
router.post(
  "/verify-otp",
  verifyOTP
);

// Reset Password
router.post(
  "/reset-password",
  resetPassword
);

export default router;