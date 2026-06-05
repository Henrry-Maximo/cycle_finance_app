import { ExpensesRepository } from "@/repositories/expenses-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { Expense } from "@/generated/prisma/client";

interface RegisterExpensesUseCaseRequest {
  id?: string;
  title: string;
  enterprise: string;
  description: string | null;
  cnpj: string | null;
  source: string | null;
  price: number;
  card_last_digits: string;
  createdAt?: Date | string;
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
    user_id,
    category_id,
  }: RegisterExpensesUseCaseRequest): Promise<RegisterExpensesUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (!category || category.user_id !== user.id) {
      throw new ResourceNotFoundError();
    }

    const priceConvertInteger = price * 100;
    const expense = await this.expensesRepository.create({
      title,
      description,
      enterprise,
      cnpj,
      source,
      price: priceConvertInteger,
      card_last_digits,
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

    return { expense: { ...expense, price: expense.price / 100 } };
  }
}
