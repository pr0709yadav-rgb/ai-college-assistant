import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/attendance`;

const getToken = () => {
  return localStorage.getItem("token");
};

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ======================================
// Get Attendance
// ======================================

export const getAttendance = async () => {
  const response = await axios.get(
    API_URL,
    config()
  );

  return response.data;
};

// ======================================
// Add Subject
// ======================================

export const addSubject = async (
  subjectData
) => {
  const response = await axios.post(
    API_URL,
    subjectData,
    config()
  );

  return response.data;
};

// ======================================
// Update Subject
// ======================================

export const updateSubject = async (
  id,
  subjectData
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    subjectData,
    config()
  );

  return response.data;
};

// ======================================
// Delete Subject
// ======================================

export const deleteSubject = async (
  id
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    config()
  );

  return response.data;
};

// ======================================
// Mark Present
// ======================================

export const markPresent = async (
  id
) => {
  const response = await axios.patch(
    `${API_URL}/present/${id}`,
    {},
    config()
  );

  return response.data;
};

// ======================================
// Mark Absent
// ======================================

export const markAbsent = async (
  id
) => {
  const response = await axios.patch(
    `${API_URL}/absent/${id}`,
    {},
    config()
  );

  return response.data;
};