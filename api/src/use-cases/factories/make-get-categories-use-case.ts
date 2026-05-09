import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";
import { GetCategoriesUseCase } from "../get-categories";

export function makeGetCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRespository();
  const getCategoriesUseCase = new GetCategoriesUseCase(categoriesRepository);

  return getCategoriesUseCase;
}