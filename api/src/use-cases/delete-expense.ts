import { ExpensesRepository } from "@/repositories/expenses-repository";

import { NotAuthorizedError } from "./errors/not-authorized-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteExpenseUseCaseRequest {
  id: string;
  userId: string;
}

export class DeleteExpenseUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  // 1. identificar despesa
  async execute({ id, userId }: DeleteExpenseUseCaseRequest): Promise<null> {
    // 2. buscar despesa
    const expense = await this.expensesRepository.findById(id);

    // 3. verificar se existe
    if (!expense) {
      throw new ResourceNotFoundError();
    }

    // 4. verificar se usuário da despesa e o mesmo da solicitação
    if (expense.user_id != userId) {
      throw new NotAuthorizedError();
    }

    // 5. realizar exclusão da despesa
    await this.expensesRepository.delete(id);

    return null;
  }
}
