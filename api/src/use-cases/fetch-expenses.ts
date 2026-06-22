import { ExpensesRepository } from "@/repositories/expenses-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Expense } from "@/generated/prisma/client";

interface FetchExpensesUseCaseRequest {
  userId: string;
  expenseName?: string;
  // mode?: Prisma.QueryMode;
  pageIndex: number;
  perPage?: number;
}

interface Pagination {
  pageIndex: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

interface FetchExpensesUseCaseResponse {
  expenses: Expense[];
  meta: Pagination;
}

export class FetchExpensesUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private expensesRepository: ExpensesRepository,
  ) {}

  async execute({
    userId,
    expenseName = "",
    // mode = "default",
    pageIndex = 0,
    perPage = 15,
  }: FetchExpensesUseCaseRequest): Promise<FetchExpensesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const expenses = await this.expensesRepository.findManyByUserId(
      userId,
      expenseName,
      pageIndex,
      perPage,
    );

    const amountOfExpenses = expenses.length;
    const totalPages = Math.ceil(expenses.length / 15);

    return {
      expenses,
      meta: {
        pageIndex,
        perPage: 15,
        totalCount: amountOfExpenses,
        totalPages: totalPages,
      },
    };
  }
}
