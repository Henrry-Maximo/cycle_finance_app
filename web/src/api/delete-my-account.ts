import { api } from '@/lib/axios';

export async function deleteMyAccount(id: string) {
  try {
    const response = await api.delete(`/users/${id}`);

    if (response.status === 401) {
      throw new Error('Você não tem permissão para apagar a despesa.');
    }
  } catch {
    throw new Error('Houve um problema para apagar a despesa.');
  }
}
