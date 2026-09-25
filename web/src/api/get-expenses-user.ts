import { api } from '@/lib/axios';

export interface GetExpenseQuery {
  pageIndex?: number | null;
}

interface Expense {
  expenses: {
    id: string;
    title: string;
    enterprise: string;
    description: string | null;
    cnpj: string | null;
    source: string | null;
    price: number;
    card_last_digits: string;
    created_at: Date;
    user_id: string;
    category_id: string;
  }[];
  meta: {
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
  };
}

export interface GetExpensesUserResponse {
  expenses: Expense[];
}

export async function getExpensesUser({ pageIndex }: GetExpenseQuery) {
  const response = await api.get<GetExpensesUserResponse>('/expenses', {
    params: {
      pageIndex,
    },
  });

  return response.data;
}
