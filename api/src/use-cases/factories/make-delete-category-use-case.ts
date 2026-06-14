import { DeleteCategoryUseCase } from "../delete-category";
import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";

export function makeDeleteCategoryUseCase() {
  const categoriesRepository = new PrismaCategoriesRespository();

  const deleteCategoriesUseCase = new DeleteCategoryUseCase(
    categoriesRepository,
  );

  return deleteCategoriesUseCase;
}
