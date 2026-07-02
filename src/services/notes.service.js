import axios from "axios";

const API = "http://localhost:5000/api/notes";

const token = () =>
  localStorage.getItem("token");

export const generateNotes = async (
  pdfId
) => {
  const res = await axios.post(
    `${API}/generate`,
    { pdfId },
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );

  return res.data;
};