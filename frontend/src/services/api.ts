import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
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

export const authAPI = {
  register: (data: { email: string; password: string; first_name: string; last_name: string }) =>
    api.post('/auth/register', data),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  googleLogin: (token: string) =>
    api.post('/auth/google-login', { token }),
  verifyEmail: (token: string) =>
    api.post('/auth/verify-email', { token }),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  verifyPasswordResetOtp: (email: string, otp: string) =>
    api.post('/auth/verify-password-reset-otp', { email, otp }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
  getCurrentUser: () =>
    api.get('/auth/me'),
  logout: () =>
    api.post('/auth/logout'),
};

export const userAPI = {
  getProfile: () =>
    api.get('/users/profile'),
  updateProfile: (data: any) =>
    api.put('/users/profile', data),
  updateAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getNotifications: () =>
    api.get('/users/notifications'),
  markNotificationAsRead: (id: string) =>
    api.put(`/users/notifications/${id}`),
};

export const analysisAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/analysis/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  analyzeImage: (imageUrl: string, userId?: string) =>
    api.post('/analysis/analyze', { 
      image_url: imageUrl,
      user_id: userId || 'demo-user'
    }),
  getAnalysisHistory: (page: number = 1, limit: number = 10) =>
    api.get(`/analysis/history?page=${page}&limit=${limit}`),
  getAnalysisDetail: (id: string) =>
    api.get(`/analysis/${id}`),
  deleteAnalysis: (id: string) =>
    api.delete(`/analysis/${id}`),
  chat: (message: string, history: { role: 'user' | 'assistant'; content: string }[]) =>
    api.post('/analysis/chat', { message, history }),
};

export const productAPI = {
  searchProducts: (query: string, page: number = 1) =>
    api.get(`/products/search?q=${encodeURIComponent(query)}&page=${page}`),
  getProductDetail: (id: string) =>
    api.get(`/products/${id}`),
  analyzeProduct: (productId: string) =>
    api.post(`/products/${productId}/analyze`),
  getSimilarProducts: (productId: string) =>
    api.get(`/products/${productId}/similar`),
};

export const recommendationAPI = {
  generateRecommendations: (skinType: string) =>
    api.post('/recommendations/generate', { skin_type: skinType }),
  getRecommendations: () =>
    api.get('/recommendations'),
  getSkinRoutine: (skinType: string) =>
    api.get(`/recommendations/routine?skin_type=${skinType}`),
};

export const blogAPI = {
  getBlogs: (page: number = 1, limit: number = 10, category?: string) => {
    let url = `/blog?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    return api.get(url);
  },
  getBlogDetail: (slug: string) =>
    api.get(`/blog/${slug}`),
  getBlogCategories: () =>
    api.get('/blog/categories'),
};

export const contactAPI = {
  sendMessage: (data: { name: string; email: string; subject: string; message: string }) =>
    api.post('/contact', data),
};

export const paymentAPI = {
  createOrder: (planId: string) =>
    api.post('/payments/create-order', { plan_id: planId }),
  verifyPayment: (orderId: string, paymentId: string, signature: string) =>
    api.post('/payments/verify', { order_id: orderId, payment_id: paymentId, signature }),
  getSubscription: () =>
    api.get('/payments/subscription'),
};

export const adminAPI = {
  getAnalytics: () =>
    api.get('/admin/analytics'),
  getUsers: (page: number = 1, limit: number = 10) =>
    api.get(`/admin/users?page=${page}&limit=${limit}`),
  updateUser: (id: string, data: any) =>
    api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) =>
    api.delete(`/admin/users/${id}`),
  getProducts: (page: number = 1, limit: number = 10) =>
    api.get(`/admin/products?page=${page}&limit=${limit}`),
  createProduct: (data: any) =>
    api.post('/admin/products', data),
  updateProduct: (id: string, data: any) =>
    api.put(`/admin/products/${id}`, data),
  deleteProduct: (id: string) =>
    api.delete(`/admin/products/${id}`),
  getFAQs: () =>
    api.get('/admin/faq'),
  createFAQ: (data: { question: string; answer: string }) =>
    api.post('/admin/faq', data),
  updateFAQ: (id: string, data: any) =>
    api.put(`/admin/faq/${id}`, data),
  deleteFAQ: (id: string) =>
    api.delete(`/admin/faq/${id}`),
};

export default api;
