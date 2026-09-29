import { api } from '@/lib/axios';

export interface GetExpenseQuery {
  pageIndex?: number | null;
  expenseId?: string | null;
  expenseName?: string | null;
  category: string | null;
}

interface Expense {
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
}

export interface GetExpensesResponse {
  expenses: Expense[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
  };
}

export async function getExpensesUser({
  pageIndex,
  expenseId,
  expenseName,
  category,
}: GetExpenseQuery) {
  const response = await api.get<GetExpensesResponse>('/expenses', {
    params: {
      pageIndex,
      expenseId,
      expenseName,
      category,
    },
  });

  return response.data;
}
