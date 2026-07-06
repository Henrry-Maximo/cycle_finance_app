import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { UpdateExpenseUseCase } from "../update-expense";

export function MakeUpdateExpensesUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const expensesRepository = new PrismaExpensesRepository();

  const updateCategoriesUseCase = new UpdateExpenseUseCase(
    usersRepository,
    expensesRepository,
  );

  return updateCategoriesUseCase;
}
