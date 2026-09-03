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

    const now = new Date();
    const fromStartDate =
      from ?? new Date(now.getFullYear(), now.getMonth(), 1);
    const toEndDate =
      to ?? new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // 1 -> avan�a um m�s, 0 -> volta 1 dia a partir do dia 1, horas/minutos/segundos

    const expensesList = await this.expensesRepository.findManyByUserIdInPeriod(
      userId,
      fromStartDate,
      toEndDate,
    );

    const transformed = expensesList.reduce<Record<string, number>>(
      (expensesByDate, expense) => {
        const year = expense.created_at.getFullYear();
        const month = String(expense.created_at.getMonth() + 1).padStart(
          2,
          "0",
        );
        const day = String(expense.created_at.getDate()).padStart(2, "0");
        const date = `${year}-${month}-${day}`;

        expensesByDate[date] = (expensesByDate[date] ?? 0) + expense.price;
        return expensesByDate;
      },
      {},
    );

    const expenses = Object.entries(transformed).map(([date, value]) => ({
      createAt: date,
      value,
    }));

    return { expenses };
  }
}
