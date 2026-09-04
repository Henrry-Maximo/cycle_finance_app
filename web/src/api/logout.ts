import { api } from '@/lib/axios';

export async function logout(): Promise<void> {
  try {
    await api.post('/logout');
  } catch {
    throw new Error('Houve um problema no logout.');
  }
}
