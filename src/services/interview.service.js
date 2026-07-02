import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/interview`;

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ====================================
// Start Interview
// ====================================

export const startInterview = async (
  type,
  role
) => {
  const response = await axios.post(
    `${BASE_URL}/start`,
    {
      type,
      role,
    },
    authConfig()
  );

  return response.data;
};

// ====================================
// Submit Answer
// ====================================

export const submitAnswer = async (
  question,
  answer,
  role,
  type
) => {
  const response = await axios.post(
    `${BASE_URL}/answer`,
    {
      question,
      answer,
      role,
      type,
    },
    authConfig()
  );

  return response.data;
};