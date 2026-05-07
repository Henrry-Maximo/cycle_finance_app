import { Expense, Prisma } from "generated/prisma/client";

enum Mode {
  caseSensitive = 'default',
  insensitive = 'insensitive'
}

export interface ExpensesRepository {
  create(data: Prisma.ExpenseCreateInput): Promise<Expense>;
  findMany(contains?: string, mode?: Mode | undefined): Promise<Expense[]>;
}
