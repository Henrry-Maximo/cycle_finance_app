import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";
import { GetCategoriesUseCase } from "../fetch-categories";

export function makeGetCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRespository();
  const getCategoriesUseCase = new GetCategoriesUseCase(categoriesRepository);

  return getCategoriesUseCase;
}