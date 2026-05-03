import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { RegisterExpensesUseCase } from "../register-expenses";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";

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
