import { api } from '@/lib/axios';

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

export interface GetExpensesUserResponse {
  expenses: Expense[];
}

export async function getExpensesUser() {
  const response = await api.get<GetExpensesUserResponse>('/expenses');

  return response.data;
}
