import { Expense, Prisma } from "generated/prisma/client";

import { ExpensesRepository } from "@/repositories/expenses-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchExpensesUseCaseRequest {
  userId: string;
  contains?: string;
  mode?: Prisma.QueryMode;
  page: number;
}

interface FetchExpensesUseCaseResponse {
  expenses: Expense[];
}

export class FetchExpensesUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private expensesRepository: ExpensesRepository,
  ) {}

  async execute({
    userId,
    contains = "",
    mode = "default",
    page,
  }: FetchExpensesUseCaseRequest): Promise<FetchExpensesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const expenses = await this.expensesRepository.findManyByUserId(
      userId,
      contains,
      mode,
      page,
    );

    return {
      expenses,
    };
  }
}
