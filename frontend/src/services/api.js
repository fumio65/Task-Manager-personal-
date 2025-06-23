import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/tasks/';

export const getAllTasks = async () => {
  const res = await axios.get(BASE_URL);
  return res.data
}

export const createTask = async (taskData) => {
  const res = await axios.post(BASE_URL, taskData);
  return res.data;
};