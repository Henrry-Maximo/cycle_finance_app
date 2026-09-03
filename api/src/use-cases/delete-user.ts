import { CategoriesRepository } from "@/repositories/categories-repository";
import { ExpensesRepository } from "@/repositories/expenses-repository";
import { ResetPasswordTokensRepository } from "@/repositories/reset-password-tokens-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { NotAuthorizedError } from "./errors/not-authorized-error";

interface DeleteUserUseCaseRequest {
  id: string;
  userId: string;
}

export class DeleteUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private expensesRepository: ExpensesRepository,
    private categoriesRepository: CategoriesRepository,
    private resetPasswordTokensRepository: ResetPasswordTokensRepository,
  ) {}

  async execute({ id, userId }: DeleteUserUseCaseRequest): Promise<null> {
    const user = await this.usersRepository.findById(id);

    if (user?.id != userId) {
      throw new NotAuthorizedError();
    }

    await this.expensesRepository.deleteByUserId(id);
    await this.categoriesRepository.deleteByUserId(id);
    await this.resetPasswordTokensRepository.deleteByUserId(id);
    await this.usersRepository.delete(id);

    return null;
  }
}
