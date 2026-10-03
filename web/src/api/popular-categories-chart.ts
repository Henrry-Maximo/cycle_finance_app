import { api } from '@/lib/axios';

type GetPopularCategoriesResponse = {
  name: string;
  count: number;
  total: number;
}[];

export async function getPopularCategories() {
  const response =
    await api.get<GetPopularCategoriesResponse>('/categories/period');

  return response.data;
}
