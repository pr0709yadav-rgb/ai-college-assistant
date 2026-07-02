import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/resume`;

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ==========================
// Analyze Resume
// ==========================

export const analyzeResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await axios.post(
    `${BASE_URL}/analyze`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};