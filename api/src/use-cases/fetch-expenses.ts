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
  pageIndex?: number | undefined;
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
    expenseName,
    categoryName,
    from,
    to,
    pageIndex = 0,
    perPage = 10,
  }: FetchExpensesUseCaseRequest): Promise<FetchExpensesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const fromStartDate = from ? from : undefined;
    const toEndDate = to ? to : undefined;

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
    const totalPages = Math.ceil(totalCount / perPage) || 1;

    return {
      expenses,
      meta: {
        pageIndex,
        perPage,
        totalCount,
        totalPages,
      },
    };
  }
}
