import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/coding`;

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const codingAssistant = async ({
  language,
  prompt,
  code,
}) => {
  const question = `
${prompt}

Code:

${code}
`;

  const response = await axios.post(
    BASE_URL,
    {
      language,
      mode: "generate",
      question,
    },
    authConfig()
  );

  return response.data;
};