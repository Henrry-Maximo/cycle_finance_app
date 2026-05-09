import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";
import { FetchCategoriesUseCase } from "../fetch-categories";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeGetCategoriesUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const categoriesRepository = new PrismaCategoriesRespository();
  const fetchCategoriesUseCase = new FetchCategoriesUseCase(usersRepository, categoriesRepository);

  return fetchCategoriesUseCase;
}