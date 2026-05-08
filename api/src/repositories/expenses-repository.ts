import { Expense, Prisma } from "generated/prisma/client";

export interface ExpensesRepository {
  create(data: Prisma.ExpenseCreateInput): Promise<Expense>;
  findMany(contains: string, mode: Prisma.QueryMode): Promise<Expense[]>;
}
