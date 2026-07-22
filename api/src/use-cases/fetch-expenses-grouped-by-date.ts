import { ExpensesRepository } from "@/repositories/expenses-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchExpensesGroupedByDateUseCaseRequest {
  userId: string;
  from?: Date;
  to?: Date;
}

interface Expense {
  createAt: string;
  value: number;
}

interface FetchExpensesGroupedByDateUseCaseResponse {
  expenses: Expense[];
}

export class FetchExpensesGroupedByDateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private expensesRepository: ExpensesRepository,
  ) {}

  async execute({
    userId,
    from,
    to,
  }: FetchExpensesGroupedByDateUseCaseRequest): Promise<FetchExpensesGroupedByDateUseCaseResponse> {
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

    const expensesList = await this.expensesRepository.findManyByUserIdInPeriod(
      userId,
      fromStartDate,
      toEndDate,
    );

    if (expensesList.length == 0) {
      return {
        expenses: [],
      };
    }

    const transformed = expensesList.reduce(
      (acc, current) => {
        const date = current.created_at.toISOString().split("T")[0]!;

        if (acc[date]) {
          acc[date] += current.price;
        } else {
          acc[date] = current.price;
        }

        // console.log(acc);
        return acc;
      },
      {} as Record<string, number>,
    );

    const expenses = Object.entries(transformed).map(([date, value]) => ({
      createAt: date,
      value,
    }));

    return { expenses };
  }
}
