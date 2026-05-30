import { api } from '@/lib/axios';

interface RegisterCategoryBody {
  title: string;
  description: string;
  // user_id: string;
}

export async function registerCategory({
  title,
  description,
  // user_id,
}: RegisterCategoryBody) {
  try {
    const response = await api.post('/categories', {
      title,
      description,
      // user_id,
    });

    if (response.status !== 201) {
      throw new Error('Não foi possível cadastrar a categoria.');
    }

    return { message: 'Categoria cadastrada com sucesso!' };
  } catch {
    throw new Error('Houve um problema com o cadastro da categoria.');
  }
}
