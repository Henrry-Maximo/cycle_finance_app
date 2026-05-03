import { Expense, Prisma } from "generated/prisma/client";

export interface ExpensesRepository {
  create(data: Prisma.ExpenseCreateInput): Promise<Expense>;
}
