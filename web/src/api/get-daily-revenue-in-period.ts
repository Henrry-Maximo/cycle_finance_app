import { api } from '@/lib/axios';

export interface GetDailyRevenueInPeriodQuery {
  from?: Date;
  to?: Date;
}

type GetPopularCategoriesResponse = {
  expenses: {
    date: string;
    value: number;
  }[];
};

export async function getDailyRevenueInPeriod({ from, to }: GetDailyRevenueInPeriodQuery) {
  const response =
    await api.get<GetPopularCategoriesResponse>('/expenses/period', {
      params: {
        from,
        to
      }
    });

  return response.data.expenses;
}
