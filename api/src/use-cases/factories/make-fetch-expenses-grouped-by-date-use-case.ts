import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { FetchExpensesGroupedByDateUseCase } from "../fetch-expenses-grouped-by-date";

export function makeFetchExpensesGroupedByDateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const expensesRepository = new PrismaExpensesRepository();
  const fetchExpensesGroupedByDateUseCase =
    new FetchExpensesGroupedByDateUseCase(usersRepository, expensesRepository);

  return fetchExpensesGroupedByDateUseCase;
}
