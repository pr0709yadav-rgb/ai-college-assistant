import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/pdf`;

// ===========================
// Get Auth Token
// ===========================

const getToken = () => {
  return localStorage.getItem("token");
};

// ===========================
// Axios Config
// ===========================

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ===========================
// Upload PDF
// ===========================

export const uploadPdf = async (file) => {
  try {
    const formData = new FormData();
    formData.append("pdf", file);

    const response = await axios.post(
      `${BASE_URL}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to upload PDF",
      }
    );
  }
};

// ===========================
// Get User PDFs
// ===========================

export const getUserPdfs = async () => {
  try {
    const response = await axios.get(
      BASE_URL,
      authConfig()
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch PDFs",
      }
    );
  }
};

// ===========================
// Get PDF URL
// ===========================

export const getPdfUrl = (id) => {
  return `${import.meta.env.VITE_API_URL}/api/pdf/view/${id}`;
};

// ===========================
// Chat With PDF
// ===========================

export const chatWithPdf = async (
  pdfId,
  question
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/chat`,
      {
        pdfId,
        question,
      },
      authConfig()
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to get AI response",
      }
    );
  }
};

// ===========================
// Delete PDF
// ===========================

export const deletePdf = async (pdfId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${pdfId}`,
      authConfig()
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to delete PDF",
      }
    );
  }
};