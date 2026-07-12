import { Expense } from "@/generated/prisma/client";
import { ExpensesRepository } from "@/repositories/expenses-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchExpensesUseCaseRequest {
  userId: string;
  expenseName?: string;
  categoryName?: string;
  from?: Date;
  to?: Date;
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
    expenseName,
    categoryName,
    from,
    to,
    pageIndex = 1,
    perPage = 15,
  }: FetchExpensesUseCaseRequest): Promise<FetchExpensesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const today = new Date();
    const fromStartDate = from
      ? from
      : new Date(today.getFullYear(), today.getMonth(), 1);
    const toEndDate = to
      ? to
      : new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const expenses = await this.expensesRepository.findManyByUserId(
      userId,
      fromStartDate,
      toEndDate,
      perPage,
      pageIndex,
      expenseName,
      categoryName,
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
