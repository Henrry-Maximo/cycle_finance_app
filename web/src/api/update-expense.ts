import { api } from '@/lib/axios';

interface UpdateExpense {
  id: string;
  title?: string;
  enterprise?: string;
  description?: string;
  cnpj?: string;
  source?: string;
  price?: number;
  card_last_digits?: string;
  category_id?: string;
}

export async function updateExpense({
  id,
  ...body
}: UpdateExpense): Promise<void> {
  await api.patch(`/expenses/${id}`, body);
}
