/**
 * Logo Ali - API Axios Instance
 * Author: Daniel Rodrigues Pereira
 * Year: 2026
 * Este arquivo centraliza as chamadas para o Django e anexa o Token de Auditoria.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

// Interceptor para injetar o Token em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;