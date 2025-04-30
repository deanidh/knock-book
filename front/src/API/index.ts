import axios from 'axios';
import * as books from './books';
import * as auth from './auth';
import * as archives from './archives';
import * as members from './members';

const api = axios.create({
  baseURL: 'https://port-0-bookhive-deploy-test-m7u9xakd7a7ad425.sel4.cloudtype.app/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (error.response?.status === 403) {
      try {
        const username = localStorage.getItem('username');
        const response = await auth.refresh(username!);
        const newAccessToken = response.accessToken;
        const newRefreshToken = response.refreshToken;

        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          return api.request(error.config);
        }
      } catch (err) {
        console.error('토큰 갱신 실패', err);
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const API = { books: books, auth: auth, archives: archives, members: members };

export default api;
