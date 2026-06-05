import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { FetchExpensesUseCase } from "../fetch-expenses";

export function makeFetchExpensesUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const expensesRepository = new PrismaExpensesRepository();
  const fetchExpensesUseCase = new FetchExpensesUseCase(
    usersRepository,
    expensesRepository,
  );

  return fetchExpensesUseCase;
}
