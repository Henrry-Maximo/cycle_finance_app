import { Expense } from "@/generated/prisma/client";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { ExpensesRepository } from "@/repositories/expenses-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { CategoryNotFoundError } from "./errors/category-not-found-error";
import { UserNotIdentifiedError } from "./errors/user-not-identifier-error";

interface RegisterExpensesUseCaseRequest {
  id?: string;
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

interface RegisterExpensesUseCaseResponse {
  expense: Expense;
}

export class RegisterExpensesUseCase {
  constructor(
    private expensesRepository: ExpensesRepository,
    private usersRepository: UsersRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    title,
    description,
    enterprise,
    cnpj,
    source,
    price,
    card_last_digits,
    created_at,
    user_id,
    category_id,
  }: RegisterExpensesUseCaseRequest): Promise<RegisterExpensesUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new UserNotIdentifiedError();
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (!category || category.user_id !== user.id) {
      throw new CategoryNotFoundError();
    }

    const expense = await this.expensesRepository.create({
      title,
      description,
      enterprise,
      cnpj,
      source,
      price,
      card_last_digits,
      created_at,
      user: {
        connect: {
          id: user.id,
        },
      },
      category: {
        connect: {
          id: category.id,
        },
      },
    });

    return { expense };
  }
}
