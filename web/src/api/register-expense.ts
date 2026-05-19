import { api } from '@/lib/axios';

interface RegisterExpenseBody {
  title: string;
  enterprise: string;
  description: string;
  cnpj: string;
  source: string;
  price: number;
  card_last_digits: string;
  user_id: string;
  category_id: string;
}

export async function registerExpense({
  title,
  enterprise,
  description,
  cnpj,
  source,
  price,
  card_last_digits,
  user_id,
  category_id,
}: RegisterExpenseBody) {
  try {
    const response = await api.post('/expenses', {
      title,
      enterprise,
      description,
      cnpj,
      source,
      price,
      card_last_digits,
      user_id,
      category_id,
    });

    if (response.status !== 201) {
      throw new Error('Não foi possível cadastrar a despesa');
    }

    return { message: 'Despesa cadastrada com sucesso!' };
  } catch {
    throw new Error('Houve um problema com o cadastro da despesa.');
  }
}
