import axios from 'axios';
import * as books from './books';
import * as auth from './auth';
import * as archives from './archives';
import * as members from './members';

const api = axios.create({
  baseURL: 'http://192.168.0.13:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await auth.refresh();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return api.request(error.config); // 요청 재시도
        }
      } catch (err) {
        console.error('토큰 갱신 실패', err);
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const API = { books: books, auth: auth, archives: archives, members: members };

export default api;
