import { ExpensesRepository } from "@/repositories/expenses-repository";
import { Expense, Prisma } from "generated/prisma/client";

interface GetExpensesUseCaseRequest {
  contains?: string;
  mode?: Prisma.QueryMode;
}

interface GetExpensesUseCaseResponse {
  expenses: Expense[];
}

export class GetExpensesUseCase {
  constructor(
    private expensesRepository: ExpensesRepository,
  ) { };

  async execute({ contains = "", mode = "default" }: GetExpensesUseCaseRequest = {}): Promise<GetExpensesUseCaseResponse> {
    const expenses = await this.expensesRepository.findMany(contains, mode);

    return { expenses };
  }
}
