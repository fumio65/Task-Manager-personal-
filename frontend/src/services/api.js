import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

export const fetchTasks = () =>
  axios.get(`${API_BASE}/tasks/`)

export const createTask = (taskData) =>
  axios.post(`${API_BASE}/tasks/`, taskData )