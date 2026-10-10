import { api } from '@/lib/axios';

type GetPopularCategoriesResponse = {
  expenses: {
    date: string;
    value: number;
  }[];
};

export async function getDailyRevenueInPeriod() {
  const response =
    await api.get<GetPopularCategoriesResponse>('/expenses/period');

  return response.data.expenses;
}
