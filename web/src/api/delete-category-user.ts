import { api } from '@/lib/axios';

export async function deleteCategoryUser(id: string) {
  try {
    const response = await api.delete(`/categories?id=${id}`);

    if (response.status === 404) {
      throw new Error('Não foi possível localizar a categoria.');
    }

    if (response.status === 409) {
      throw new Error(
        'Não foi possível apagar a categoria devido ao vínculo com despesas.',
      );
    }

    if (response.status === 401) {
      throw new Error('Você não tem permissão para apagar a categoria.');
    }
  } catch {
    throw new Error('Houve um problema para apagar a categoria.');
  }
}
