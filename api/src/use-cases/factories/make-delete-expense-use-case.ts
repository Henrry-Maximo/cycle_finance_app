import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";

import { DeleteExpenseUseCase } from "../delete-expense";

export function makeDeleteExpenseUseCase() {
  const expensesRepository = new PrismaExpensesRepository();

  const deleteExpensesUseCase = new DeleteExpenseUseCase(expensesRepository);

  return deleteExpensesUseCase;
}
