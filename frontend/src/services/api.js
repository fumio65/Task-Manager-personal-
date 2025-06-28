import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

export const getAllTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const updateTask = async (id, updates) => {
  const res = await axios.patch(`${API_URL}${id}/`, updates);
  return res.data;
}

export const createTask = async (taskData) => {
  const res = await axios.post(API_URL, taskData);
  return res.data;
}
 
export const getTaskById = async (id) => {
  const res = await axios.get(`${API_URL}${id}/`);
  return res.data;
}


export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}${id}/`)
  return res.data;
} 