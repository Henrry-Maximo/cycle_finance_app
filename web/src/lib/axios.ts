import axios from 'axios';

import { env } from '@/env';

// const tokenApi = localStorage.getItem('cycle_finance_api') ?? null;
export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true, // cookies do frontend enviados automaticamente para o backend (assim o back pode ter acesso ao cookie de autenticação, e determinar se o usuário está logado)
});

if (env.VITE_ENABLE_API_DELAY) {
  // interceptar cada requisição, config -> dados da requisição, podendo customizar
  api.interceptors.request.use(async (config) => {
    // adiciona delay de 2 segundos em cada requisição
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return config;
  });
}

// interceptar requsição e modificar configurações se token existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cycle_finance_api');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
