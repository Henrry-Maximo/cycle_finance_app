import { api } from '@/lib/axios';

export interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
  captchaToken: string;
}

export async function registerUser({
  username,
  email,
  password,
  captchaToken,
}: RegisterUserBody) {
  const response = await api.post('/users', {
    username,
    email,
    password,
    captchaToken,
  });

  return response.data;
}
