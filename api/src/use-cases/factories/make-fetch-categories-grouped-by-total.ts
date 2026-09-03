import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { FetchCategoriesGroupedByTotalUseCase } from "../fetch-categories-grouped-by-total";

export function makeFetchCategoriesGroupedByTotalUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const categoriesRepository = new PrismaCategoriesRespository();
  const expensesRepository = new PrismaExpensesRepository();

  const fetchCategoriesGroupedByTotalUseCase =
    new FetchCategoriesGroupedByTotalUseCase(
      usersRepository,
      categoriesRepository,
      expensesRepository,
    );

  return fetchCategoriesGroupedByTotalUseCase;
}
