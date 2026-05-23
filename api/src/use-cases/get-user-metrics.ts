import { ExpensesRepository } from "@/repositories/expenses-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
  from?: Date | null;
  to?: Date | null;
}

interface GetUserMetricsUseCaseResponse {
  total_expenses_month: number;
  total_expenses_day: number;
  count_expenses_month: number;
  count_expenses_day: number;
}

export class GetUserMetricsUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private expensesRepository: ExpensesRepository,
  ) {}

  async execute({
    userId,
    from,
    to,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
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
    const expenses = await this.expensesRepository.findManyByUserIdInPeriod(
      userId,
      fromStartDate,
      toEndDate,
    );

    let total_expenses_month = 0; // price number on month
    let count_expenses_month = 0; // total number on month
    let total_expenses_day = 0; // price number on day
    let count_expenses_day = 0; // total number on day

    for (const expense of expenses) {
      total_expenses_month += expense.price / 100;
      count_expenses_month += 1;

      if (expense.created_at.toDateString() === today.toDateString()) {
        total_expenses_day += expense.price / 100;
        count_expenses_day += 1;
      }
    }

    return {
      count_expenses_day,
      count_expenses_month,
      total_expenses_day,
      total_expenses_month,
    };
  }
}
