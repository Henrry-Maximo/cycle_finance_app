import axios from 'axios';

import { env } from '@/env';

const tokenApi = localStorage.getItem("cycle_finance_api") ?? null;
export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Authorization': `Bearer ${tokenApi}`,
    'Content-Type': 'application/json'
  }
});

// interceptar requsição e modificar configurações se token existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cycle_finance_api');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
