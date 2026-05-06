import axios from 'axios';

const api = axios.create({
  // Se estiver rodando junto, o baseURL pode ser relativo
  baseURL: '/api', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;