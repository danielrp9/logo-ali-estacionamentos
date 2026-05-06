// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // SÓ redireciona se for 401 e SE não estivermos na rota de sucesso
    if (error.response && error.response.status === 401) {
        const isSuccessPage = window.location.pathname.includes('/sucesso');
        
        if (!isSuccessPage) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
  }
);

export default api;