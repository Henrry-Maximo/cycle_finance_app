import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { PrismaExpensesRepository } from "@/repositories/prisma/prisma-expenses-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetMetricsUserUseCase() {
  const expensesRepository = new PrismaExpensesRepository();
  const usersRepository = new PrismaUsersRepository();
  const getMetricsUserUseCase = new GetUserMetricsUseCase(
    usersRepository,
    expensesRepository,
  );

  return getMetricsUserUseCase;
}
