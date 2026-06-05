import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { RegisterExpensesUseCase } from "../register-expenses";

export function makeRegisterExpensesUseCase() {
  const expensesRepository = new PrismaExpensesRepository();
  const usersRepository = new PrismaUsersRepository();
  const categoriesRepository = new PrismaCategoriesRespository();

  const registerExpensesUseCase = new RegisterExpensesUseCase(
    expensesRepository,
    usersRepository,
    categoriesRepository,
  );

  return registerExpensesUseCase;
}
