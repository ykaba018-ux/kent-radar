import axios from 'axios';
import io from 'socket.io-client';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== AUTHENTICATION ====================
export const authAPI = {
  login: (email, password) => api.post('/auth/admin/login', { email, password }),
  logout: () => api.post('/auth/admin/logout'),
  getProfile: () => api.get('/auth/admin/profile'),
  updateProfile: (data) => api.put('/auth/admin/profile', data),
};

// ==================== REPORTS ====================
export const reportsAPI = {
  getAll: (params) => api.get('/admin/reports', { params }),
  getById: (id) => api.get(`/admin/reports/${id}`),
  updateStatus: (id, status) => api.put(`/admin/reports/${id}/status`, { status }),
  assignTeam: (id, teamId) => api.put(`/admin/reports/${id}/assign`, { team_id: teamId }),
  addComment: (id, comment) => api.post(`/admin/reports/${id}/comments`, { comment }),
  getComments: (id) => api.get(`/admin/reports/${id}/comments`),
  delete: (id) => api.delete(`/admin/reports/${id}`),
};

// ==================== STATISTICS ====================
export const statisticsAPI = {
  getDashboard: () => api.get('/admin/statistics/dashboard'),
  getReportsByCategory: (timeRange) => api.get('/admin/statistics/by-category', { params: { time_range: timeRange } }),
  getReportsByDistrict: (timeRange) => api.get('/admin/statistics/by-district', { params: { time_range: timeRange } }),
  getReportsByStatus: () => api.get('/admin/statistics/by-status'),
  getPerformance: () => api.get('/admin/statistics/performance'),
};

// ==================== TEAM MANAGEMENT ====================
export const teamAPI = {
  getAll: () => api.get('/admin/teams'),
  getById: (id) => api.get(`/admin/teams/${id}`),
  create: (data) => api.post('/admin/teams', data),
  update: (id, data) => api.put(`/admin/teams/${id}`, data),
  delete: (id) => api.delete(`/admin/teams/${id}`),
  assignMember: (teamId, memberId) => api.post(`/admin/teams/${teamId}/members`, { member_id: memberId }),
  removeMember: (teamId, memberId) => api.delete(`/admin/teams/${teamId}/members/${memberId}`),
};

// ==================== USER MANAGEMENT ====================
export const usersAPI = {
  getAll: (params) => api.get('/admin/users', { params }),
  getById: (id) => api.get(`/admin/users/${id}`),
  create: (data) => api.post('/admin/users', data),
  update: (id, data) => api.put(`/admin/users/${id}`, data),
  delete: (id) => api.delete(`/admin/users/${id}`),
  changeRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
};

// ==================== DEPARTMENTS ====================
export const departmentsAPI = {
  getAll: () => api.get('/admin/departments'),
  getById: (id) => api.get(`/admin/departments/${id}`),
  create: (data) => api.post('/admin/departments', data),
  update: (id, data) => api.put(`/admin/departments/${id}`, data),
  delete: (id) => api.delete(`/admin/departments/${id}`),
};

// ==================== CATEGORIES ====================
export const categoriesAPI = {
  getAll: () => api.get('/admin/categories'),
  getById: (id) => api.get(`/admin/categories/${id}`),
  create: (data) => api.post('/admin/categories', data),
  update: (id, data) => api.put(`/admin/categories/${id}`, data),
  delete: (id) => api.delete(`/admin/categories/${id}`),
};

// ==================== LOCATIONS ====================
export const locationsAPI = {
  getDistricts: () => api.get('/locations/districts'),
  getNeighborhoods: (districtId) => api.get('/locations/neighborhoods', { params: { district_id: districtId } }),
};

// ==================== SOCKET IO ====================
export const socket = io(SOCKET_URL, {
  auth: {
    token: localStorage.getItem('admin_token'),
  },
});

socket.on('connect', () => {
  console.log('Socket connected');
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

export default api;
