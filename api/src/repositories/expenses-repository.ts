import { Expense, Prisma } from "generated/prisma/client";

// CheckInUncheckedCreateInput
export interface ExpensesRepository {
  create(data: Prisma.ExpenseCreateInput): Promise<Expense>;
}
