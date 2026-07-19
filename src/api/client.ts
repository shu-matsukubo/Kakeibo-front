import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { notifyAuthExpired, refreshSession } from '@/auth/session';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BFF_BASE_URL
    ? `${import.meta.env.VITE_BFF_BASE_URL}/api`
    : 'http://localhost:18082/api',
  withCredentials: true,
});

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshSession().finally(() => {
        refreshPromise = null;
      });

      await refreshPromise;
      return api(originalRequest);
    } catch (refreshError) {
      notifyAuthExpired();
      return Promise.reject(refreshError);
    }
  }
);
