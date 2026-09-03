import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { UpdateCategoryUseCase } from "../update-category";

export function MakeUpdateCategoriesUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const categoriesRepository = new PrismaCategoriesRespository();

  const updateCategoriesUseCase = new UpdateCategoryUseCase(
    usersRepository,
    categoriesRepository,
  );

  return updateCategoriesUseCase;
}
