import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfileSummary: (summary) => api.put('/profile/summary', { summary }),
  updatePhoto: (formData) => api.post('/profile/photo', formData),
  deletePhoto: () => api.delete('/profile/photo'),
  getSkills: () => api.get('/skills'),
  addSkill: (skill) => api.post('/skills', skill),
  updateSkill: (id, skill) => api.put(`/skills/${id}`, skill),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
  getExperience: () => api.get('/experience'),
  addExperience: (exp) => api.post('/experience', exp),
  updateExperience: (id, exp) => api.put(`/experience/${id}`, exp),
  deleteExperience: (id) => api.delete(`/experience/${id}`),
};

export const filesAPI = {
  getFiles: (type) => api.get(`/files/${type}`),
  uploadFile: (formData) => api.post('/files/upload', formData),
  deleteFile: (id) => api.delete(`/files/${id}`),
  getFileUrl: (id) => `${API_BASE_URL}/files/view/${id}`,
  downloadFile: (id) => api.get(`/files/download/${id}`, { responseType: 'blob' }),
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify'),
};

export const systemAPI = {
  healthCheck: () => api.get('/health'),
  getGitHubStats: () => api.get('/github/stats'),
};

export default api;