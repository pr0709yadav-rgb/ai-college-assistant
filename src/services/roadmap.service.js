import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/roadmap`;

const getToken = () => {
  return localStorage.getItem("token");
};

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ======================================
// Generate AI Roadmap
// ======================================

export const generateRoadmap = async (roadmapData) => {
  const response = await axios.post(
    `${API_URL}/generate`,
    roadmapData,
    config()
  );

  return response.data;
};

// ======================================
// Save Roadmap
// ======================================

export const saveRoadmap = async (roadmapData) => {
  const response = await axios.post(
    API_URL,
    roadmapData,
    config()
  );

  return response.data;
};

// ======================================
// Get All Roadmaps
// ======================================

export const getRoadmaps = async () => {
  const response = await axios.get(
    API_URL,
    config()
  );

  return response.data;
};

// ======================================
// Get Single Roadmap
// ======================================

export const getRoadmap = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    config()
  );

  return response.data;
};

// ======================================
// Toggle Task Completion
// ======================================

export const toggleTask = async (
  id,
  weekIndex,
  taskIndex
) => {
  const response = await axios.patch(
    `${API_URL}/${id}/task`,
    {
      weekIndex,
      taskIndex,
    },
    config()
  );

  return response.data;
};

// ======================================
// Delete Roadmap
// ======================================

export const deleteRoadmap = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    config()
  );

  return response.data;
};