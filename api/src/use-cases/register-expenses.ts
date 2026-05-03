import { Expense } from "generated/prisma/client";
import { ExpensesRepository } from "@/repositories/expenses-repository";

interface RegisterExpensesUseCaseRequest {
  id?: string;
  title: string;
  enterprise: string;
  description: string | null;
  CNPJ: string | null;
  source: string | null;
  price: number;
  card_last_digits: string;
  createdAt?: Date | string;
  user_id: string;
  category_id: number;
}

interface RegisterExpensesUseCaseResponse {
  expense: Expense;
}

export class RegisterExpensesUseCase {
  constructor(private expensesRepository: ExpensesRepository) { }

  async execute({
    title,
    description,
    enterprise,
    CNPJ,
    source,
    price,
    card_last_digits,
    user_id,
    category_id,
  }: RegisterExpensesUseCaseRequest): Promise<RegisterExpensesUseCaseResponse> {
    const expense = await this.expensesRepository.create({
      title,
      description,
      enterprise,
      CNPJ,
      source,
      price,
      card_last_digits,
      user_id,
      category_id,
    });

    return { expense };
  }
}
