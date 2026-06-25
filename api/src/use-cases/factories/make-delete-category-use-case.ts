import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";

import { DeleteCategoryUseCase } from "../delete-category";

export function makeDeleteCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRespository();

  const deleteCategoriesUseCase = new DeleteCategoryUseCase(
    categoriesRepository,
  );

  return deleteCategoriesUseCase;
}
