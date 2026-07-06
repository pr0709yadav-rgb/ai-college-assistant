import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

// ===============================
// Send OTP
// ===============================

export const sendOTP = async (email) => {
  const response = await axios.post(
    `${API_URL}/send-otp`,
    {
      email,
    }
  );

  return response.data;
};

// ===============================
// Verify OTP
// ===============================

export const verifyOTP = async (
  email,
  otp
) => {
  const response = await axios.post(
    `${API_URL}/verify-otp`,
    {
      email,
      otp,
    }
  );

  return response.data;
};

// ===============================
// Reset Password
// ===============================

export const resetPassword = async (
  email,
  password
) => {
  const response = await axios.post(
    `${API_URL}/reset-password`,
    {
      email,
      password,
    }
  );

  return response.data;
};