import { api } from '@/lib/axios';

export async function deleteExpenseUser(id: string) {
  try {
    const response = await api.delete(`/expenses?id=${id}`);

    if (response.status === 404) {
      throw new Error('Não foi possível localizar a despesa.');
    }

    if (response.status === 401) {
      throw new Error('Você não tem permissão para apagar a despesa.');
    }
  } catch {
    throw new Error('Houve um problema para apagar a despesa.');
  }
}
