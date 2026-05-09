import { ExpensesRepository } from "@/repositories/expenses-repository";
import { Expense, Prisma } from "generated/prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";

interface FetchExpensesUseCaseRequest {
  userId: string;
  contains?: string;
  mode?: Prisma.QueryMode;
}

interface FetchExpensesUseCaseResponse {
  expenses: Expense[];
}

export class FetchExpensesUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private expensesRepository: ExpensesRepository,
  ) { };

  async execute({ userId, contains = "", mode = "default" }: FetchExpensesUseCaseRequest): Promise<FetchExpensesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const expenses = await this.expensesRepository.findManyByUserId(userId, contains, mode);

    return {
      expenses
    };
  }
}
