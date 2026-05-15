import { ExpensesRepository } from "@/repositories/expenses-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
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
  ) { }

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const {
      count_expenses_day,
      count_expenses_month,
      total_expenses_day,
      total_expenses_month,
    } = await this.expensesRepository.summaryByUserId(userId);

    return {
      count_expenses_day,
      count_expenses_month,
      total_expenses_day,
      total_expenses_month,
    };
  }
}
