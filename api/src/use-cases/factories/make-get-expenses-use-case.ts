import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { GetExpensesUseCase } from "../get-expenses";

export function makeGetExpensesUseCase() {
  const expensesRepository = new PrismaExpensesRepository();
  const getExpensesUseCase = new GetExpensesUseCase(expensesRepository);

  return getExpensesUseCase;
}