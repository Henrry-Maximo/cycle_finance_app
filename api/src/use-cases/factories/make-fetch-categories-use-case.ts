import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { FetchCategoriesUseCase } from "../fetch-categories";

export function makeGetCategoriesUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const categoriesRepository = new PrismaCategoriesRespository();
  const fetchCategoriesUseCase = new FetchCategoriesUseCase(
    usersRepository,
    categoriesRepository,
  );

  return fetchCategoriesUseCase;
}
