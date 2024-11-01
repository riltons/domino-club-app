import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
});

// Interceptors para debug
api.interceptors.request.use((config) => {
  console.log('Request:', config);
  return config;
});

api.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
}, (error) => {
  console.error('API Error:', error);
  return Promise.reject(error);
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@dominoclub:token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export { api };