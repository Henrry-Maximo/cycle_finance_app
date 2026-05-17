import axios from 'axios';

import { env } from '@/env';

const tokenApi = localStorage.getItem("cycle_finance_api") ?? null;
export const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Authorization': `Bearer ${tokenApi}`,
    'Content-Type': 'application/json'
  }
})
