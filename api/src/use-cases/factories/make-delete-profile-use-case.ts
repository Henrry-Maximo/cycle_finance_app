import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";

import { DeleteUserUseCase } from "../delete-user";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaResetPasswordTokensRepository } from "@/repositories/prisma/prisma-reset-password-tokens-repository";

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const expensesRepository = new PrismaExpensesRepository();
  const categoriesRepository = new PrismaCategoriesRespository();
  const resetPasswordRepository = new PrismaResetPasswordTokensRepository();

  const deleteUserUseCase = new DeleteUserUseCase(
    usersRepository,
    expensesRepository,
    categoriesRepository,
    resetPasswordRepository,
  );

  return deleteUserUseCase;
}
