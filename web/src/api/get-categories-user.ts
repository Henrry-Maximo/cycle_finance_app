import { api } from '@/lib/axios';

interface Category {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  user_id: string;
}

export interface GetCategoriesUserResponse {
  categories: Category[];
}

export async function getCategoriesUser() {
  const response = await api.get<GetCategoriesUserResponse>('/categories');

  return response.data;
}
