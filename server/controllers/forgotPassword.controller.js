import bcrypt from "bcrypt";

import User from "../models/user.js";
import OTP from "../models/otp.js";

import generateOTP from "../utils/generateOTP.js";
import { sendOTPEmail } from "../service/email.service.js";

// ======================================
// Send OTP
// ======================================

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete previous OTPs
    await OTP.deleteMany({ email });

    // Generate OTP
    const otp = generateOTP();

    // Hash OTP before storing
    const hashedOTP = await bcrypt.hash(
      otp,
      10
    );

    // Save OTP
    await OTP.create({
      email,
      otp: hashedOTP,
      isVerified: false,
      expiresAt: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    });

    // Send Original OTP to Email
    await sendOTPEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================
// Verify OTP
// ======================================

export const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    if (!email || !otp) {

      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });

    }

    const otpData = await OTP.findOne({
      email,
    });

    if (!otpData) {

      return res.status(400).json({
        success: false,
        message: "OTP not found.",
      });

    }

    // Expiry Check

    if (
      otpData.expiresAt < new Date()
    ) {

      await OTP.deleteMany({
        email,
      });

      return res.status(400).json({
        success: false,
        message: "OTP expired.",
      });

    }

    // Compare Hashed OTP

    const isMatch =
      await bcrypt.compare(
        otp,
        otpData.otp
      );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });

    }

    // Mark Verified

    otpData.isVerified = true;

    await otpData.save();

    res.status(200).json({
      success: true,
      message:
        "OTP verified successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// Reset Password
// ======================================

export const resetPassword = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });

    }

    // Find verified OTP

    const otpData = await OTP.findOne({
      email,
      isVerified: true,
    });

    if (!otpData) {

      return res.status(400).json({
        success: false,
        message: "OTP verification required.",
      });

    }

    // Check expiry

    if (otpData.expiresAt < new Date()) {

      await OTP.deleteMany({
        email,
      });

      return res.status(400).json({
        success: false,
        message: "OTP expired.",
      });

    }

    // Check user

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found.",
      });

    }

    // Hash new password

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Update password

    user.password = hashedPassword;

    await user.save();

    // Delete OTP after successful reset

    await OTP.deleteMany({
      email,
    });

    res.status(200).json({
      success: true,
      message:
        "Password reset successful.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};