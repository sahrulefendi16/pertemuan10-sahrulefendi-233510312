// src/services/api.js - Enhanced version
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- Helper function for error handling ---
const handleApiError = (error, defaultMessage) => {
  console.error('API Error:', error.response ? error.response.data : error.message);
  const errorMessage = error.response?.data?.message || 
                      error.response?.data || 
                      error.message || 
                      defaultMessage;
  throw new Error(errorMessage);
};

// --- Fungsi untuk Otentikasi ---
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    const { accessToken, user } = response.data;
    
    // Store token and user data
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      token: accessToken,
      user: user
    };
  } catch (error) {
    handleApiError(error, 'Login failed. Please check your credentials.');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    const { accessToken, user } = response.data;
    
    // Store token and user data
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      token: accessToken,
      user: user
    };
  } catch (error) {
    handleApiError(error, 'Registration failed. Username/Email might already exist.');
  }
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// --- Fungsi untuk UKM ---
export const fetchUKMs = async () => {
  try {
    const response = await api.get('/ukms');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch UKMs');
  }
};

export const fetchUKMById = async (id) => {
  try {
    const response = await api.get(`/ukms/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to fetch UKM with ID ${id}`);
  }
};

export const createUKM = async (ukmData) => {
  try {
    const response = await api.post('/ukms', ukmData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to create new UKM');
  }
};

export const updateUKM = async (id, ukmData) => {
  try {
    const response = await api.put(`/ukms/${id}`, ukmData);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to update UKM with ID ${id}`);
  }
};

export const deleteUKM = async (id) => {
  try {
    const response = await api.delete(`/ukms/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to delete UKM with ID ${id}`);
  }
};

// --- Fungsi untuk Prestasi ---
export const fetchAchievements = async () => {
  try {
    const response = await api.get('/achievements');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to fetch achievements');
  }
};

export const fetchAchievementById = async (id) => {
  try {
    const response = await api.get(`/achievements/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to fetch achievement with ID ${id}`);
  }
};

export const createAchievement = async (achievementData) => {
  try {
    const response = await api.post('/achievements', achievementData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to create new achievement');
  }
};

export const updateAchievement = async (id, achievementData) => {
  try {
    const response = await api.put(`/achievements/${id}`, achievementData);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to update achievement with ID ${id}`);
  }
};

export const deleteAchievement = async (id) => {
  try {
    const response = await api.delete(`/achievements/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error, `Failed to delete achievement with ID ${id}`);
  }
};

// --- Fungsi untuk Pencarian ---
export const searchUKMs = async (query) => {
  try {
    const response = await api.get(`/ukms/search`, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to search UKMs');
  }
};

export const searchAchievements = async (query) => {
  try {
    const response = await api.get(`/achievements/search`, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to search achievements');
  }
};

// --- Export axios instance for custom requests ---
export { api };

export default api;