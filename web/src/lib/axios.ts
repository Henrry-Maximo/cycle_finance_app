import axios from 'axios';

import { refreshTokenSession } from '@/api/refresh-token-session';
import { tokenBridge } from '@/contexts/authentication-context';
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // se a requisição retornar 401, o token principal expirou
    if (error.response?.status === 401) {
      try {
        const { token } = await refreshTokenSession();
        // atualiza o token no contexto React via tokenBridge
        tokenBridge.setToken(token);
        error.config.headers.Authorization = `Bearer ${token}`;
        return api(error.config);
      } catch {
        window.location.href = '/sign-in';
      }
    }

    return Promise.reject(error);
  },
);

// // interceptar requsição e modificar configurações se token existir
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('cycle_finance_api');

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );
