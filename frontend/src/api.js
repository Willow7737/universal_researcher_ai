import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://universal-researcher-ai.onrender.com";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000, // Increase timeout to 45 seconds for Render cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Special handling for login requests - longer timeout
    if (config.url === '/auth/login') {
      config.timeout = 60000; // 60 seconds for login
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and retry on timeouts
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Retry logic for timeout errors
    if (error.code === 'ECONNABORTED' && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log('Retrying request due to timeout...');
      return instance(originalRequest);
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
