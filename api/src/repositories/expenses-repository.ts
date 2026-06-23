import { Expense, Prisma } from "@/generated/prisma/client";

export interface ExpensesRepository {
  create(data: Prisma.ExpenseCreateInput): Promise<Expense>;
  findById(id: string): Promise<Expense | null>;
  findManyByUserId(
    userId: string,
    expenseName: string,
    pageIndex: number,
    perPage: number,
  ): Promise<Expense[]>;
  findManyByUserIdInPeriod(
    userId: string,
    from: Date,
    to: Date,
  ): Promise<Expense[]>;
  countByUserId(userId: string, expenseName: string): Promise<number>;
  delete(id: string): Promise<null>;
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
