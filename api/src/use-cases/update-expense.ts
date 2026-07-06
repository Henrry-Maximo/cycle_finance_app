import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ExpensesRepository } from "@/repositories/expenses-repository";
import { CategoryAlreadyInUseError } from "./errors/category-already-in-use-error";
import { Expense } from "@/generated/prisma/client";
import { CategoriesRepository } from "@/repositories/categories-repository";

interface UpdateExpenseUseCaseRequest {
  userId: string;
  expenseId: string;
  title?: string;
  enterprise?: string;
  description?: string;
  cnpj?: string;
  source?: string;
  price?: number;
  card_last_digits?: string;
  category?: string;
}

interface UpdateExpenseUseCaseResponse {
  expense: Expense;
}

export class UpdateExpenseUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private expensesRepository: ExpensesRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    userId,
    expenseId,
    ...data
  }: UpdateExpenseUseCaseRequest): Promise<UpdateExpenseUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const expenseFinding = await this.expensesRepository.findById(expenseId);

    if (!expenseFinding) {
      throw new ResourceNotFoundError();
    }

    if (user.id !== expenseFinding.user_id) {
      throw new ResourceNotFoundError();
    }

    if (data.category) {
      if (expenseFinding.category_id === data.category) {
        throw new CategoryAlreadyInUseError();
      }

      const categoryFinding = await this.categoriesRepository.findById(
        data.category,
      );

      if (!categoryFinding) {
        throw new ResourceNotFoundError();
      }

      if (categoryFinding.user_id !== user.id) {
        throw new ResourceNotFoundError();
      }
    }

    const expense = await this.expensesRepository.update(expenseId, {
      title: data.title ? data.title : expenseFinding.title,
      description: data.description
        ? data.description
        : expenseFinding.description,
      enterprise: data.enterprise ? data.enterprise : expenseFinding.enterprise,
      cnpj: data.cnpj ? data.cnpj : expenseFinding.cnpj,
      source: data.source ? data.source : expenseFinding.source,
      price: data.price ? data.price : expenseFinding.price,
      card_last_digits: data.card_last_digits
        ? data.card_last_digits
        : expenseFinding.card_last_digits,
      ...(data.category && {
        category: {
          connect: {
            id: data.category,
          },
        },
      }),
    });

    return { expense };
  }
}
