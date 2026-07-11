import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";

import { DeleteUserUseCase } from "../delete-user";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const expensesRepository = new PrismaExpensesRepository();
  const categoriesRepository = new PrismaCategoriesRespository();

  const deleteUserUseCase = new DeleteUserUseCase(
    usersRepository,
    expensesRepository,
    categoriesRepository,
  );

  return deleteUserUseCase;
}
