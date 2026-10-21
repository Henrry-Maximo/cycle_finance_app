import { api } from '@/lib/axios';

interface RegisterCategoryBody {
  title: string;
  description?: string;
}

export async function registerCategory({
  title,
  description,
}: RegisterCategoryBody) {
  const response = await api.post('/categories', {
    title,
    description,
  });

  if (response.status == 403) {
    throw new Error('O limite de cadastro de categorias foi alcançado.');
  }

  if (response.status !== 201 && response.status !== 403) {
    throw new Error('Não foi possível cadastrar a categoria.');
  }

  return { message: 'Categoria cadastrada com sucesso!' };
}
