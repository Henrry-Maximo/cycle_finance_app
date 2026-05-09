import { Expense, Prisma } from "generated/prisma/client";

export interface ExpensesRepository {
  create(data: Prisma.ExpenseCreateInput): Promise<Expense>;
  findManyByUserId(userId: string, contains: string, mode: Prisma.QueryMode, page: number): Promise<Expense[]>;
  countByUserId(userId: string): Promise<number>;
}
