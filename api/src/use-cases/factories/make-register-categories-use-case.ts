import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaCategoriesRespository } from "@/repositories/prisma/prisma-categories-repository";
import { RegisterCategoriesUseCase } from "../register-categories";

export function makeRegisterCategoriesUseCase() {
  const categoriesRepository = new PrismaCategoriesRespository();
  const usersRepository = new PrismaUsersRepository();

  const registerCategoriesUseCase = new RegisterCategoriesUseCase(
    usersRepository,
    categoriesRepository,
  );

  return registerCategoriesUseCase;
}
