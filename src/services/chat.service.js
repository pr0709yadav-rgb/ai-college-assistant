import axios from "axios";

const BASE_URL = "http://localhost:5000/api/chat";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Send Message
export const sendMessage = async (message) => {
  const response = await axios.post(
    BASE_URL,
    { message },
    authConfig()
  );

  return response.data;
};

// Get History
export const getChatHistory = async () => {
  const response = await axios.get(
    BASE_URL,
    authConfig()
  );

  return response.data;
};

// Delete History
export const deleteChatHistory = async () => {
  const response = await axios.delete(
    BASE_URL,
    authConfig()
  );

  return response.data;
};