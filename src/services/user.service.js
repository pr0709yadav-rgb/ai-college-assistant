import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/user`;

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ==========================
// Get Profile
// ==========================

export const getProfile = async () => {
  const response = await axios.get(
    `${BASE_URL}/profile`,
    authConfig()
  );

  return response.data;
};

// ==========================
// Update Profile
// ==========================

export const updateProfile = async (userData) => {
  const response = await axios.put(
    `${BASE_URL}/profile`,
    userData,
    authConfig()
  );

  return response.data;
};

// ==========================
// Change Password
// ==========================

export const changePassword = async (passwordData) => {
  const response = await axios.put(
    `${BASE_URL}/change-password`,
    passwordData,
    authConfig()
  );

  return response.data;
};