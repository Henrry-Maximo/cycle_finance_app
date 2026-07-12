import { Expense, Prisma } from "@/generated/prisma/client";

export interface ExpensesRepository {
  create(data: Prisma.ExpenseCreateInput): Promise<Expense>;
  findById(id: string): Promise<Expense | null>;
  findManyByUserId(
    userId: string,
    from: Date,
    to: Date,
    perPage: number,
    pageIndex: number,
    expenseName?: string,
    categoryName?: string,
  ): Promise<Expense[]>;
  findManyByUserIdInPeriod(
    userId: string,
    from: Date,
    to: Date,
  ): Promise<Expense[]>;
  countByUserId(userId: string, expenseName?: string): Promise<number>;
  update(
    id: string,
    data: Omit<Prisma.ExpenseUpdateInput, "id" | "user" | "created_at">,
  ): Promise<Expense>;
  delete(id: string): Promise<null>;
  deleteByUserId(userId: string): Promise<void>;
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
