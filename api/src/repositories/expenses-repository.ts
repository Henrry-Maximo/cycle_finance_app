import { Expense, Prisma } from "generated/prisma/client";

interface ExpensesSummary {
  total_expenses_month: number;
  total_expenses_day: number;
  count_expenses_month: number;
  count_expenses_day: number;
}

export interface ExpensesRepository {
  create(data: Prisma.ExpenseCreateInput): Promise<Expense>;
  findManyByUserId(
    userId: string,
    contains: string,
    mode: Prisma.QueryMode,
    page: number,
  ): Promise<Expense[]>;
  summaryByUserId(userId: string): Promise<ExpensesSummary>;
}

// total expense on month R$
// total count expenses by month
// total count expenses by day
// total expense on day

// object = {
// total_expenses_month: number,
// total_expenses_day: number,
// count_expenses_month: number,
// count_expenses_day: number
// }
