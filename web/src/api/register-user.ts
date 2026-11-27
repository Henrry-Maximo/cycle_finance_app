import { api } from '@/lib/axios';

export interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
}

export async function registerUser({
  username,
  email,
  password,
}: RegisterUserBody) {
  const response = await api.post('/users', { username, email, password });

  return response.data;
}
