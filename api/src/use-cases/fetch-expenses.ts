import { ExpensesRepository } from "@/repositories/expenses-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Expense } from "@/generated/prisma/client";

interface FetchExpensesUseCaseRequest {
  userId: string;
  expenseName?: string;
  pageIndex: number;
  perPage?: number;
}

interface Pagination {
  page: number;
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
    pageIndex = 1,
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

    const totalCount = await this.expensesRepository.countByUserId(
      userId,
      expenseName,
    );
    const totalPages = Math.ceil(totalCount / perPage);

    return {
      expenses,
      meta: {
        page: pageIndex,
        perPage,
        totalCount,
        totalPages,
      },
    };
  }
}
