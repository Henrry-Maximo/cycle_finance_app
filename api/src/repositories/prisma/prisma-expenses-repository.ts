import { ExpenseCreateInput } from "generated/prisma/models";
import { ExpensesRepository } from "../expenses-repository";
import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class PrismaExpensesRepository implements ExpensesRepository {
  async create(data: ExpenseCreateInput) {
    const expense = await prisma.expense.create({
      data,
    });

    return expense;
  }

  async findManyByUserId(
    user_id: string,
    contains: string,
    mode: Prisma.QueryMode,
  ) {
    const expenses = await prisma.expense.findMany({
      where: {
        user_id: {
          equals: user_id,
        },
        title: {
          contains,
          mode,
        },
      },
    });

    return expenses;
  }

  async summaryByUserId(userId: string) {
    const today = new Date(); // get current date

    const expenses = await prisma.expense.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1), // get first day of the month
          lte: new Date(today.getFullYear(), today.getMonth() + 1, 0), // get last day of the month
        },
      },
    });

    let total_expenses_month = 0; // price number on month
    let count_expenses_month = 0; // total number on month
    let total_expenses_day = 0; // price number on day
    let count_expenses_day = 0; // total number on day

    for (const expense of expenses) {
      total_expenses_month += expense.price;
      count_expenses_month += 1;

      if (expense.created_at.toDateString() === today.toDateString()) {
        total_expenses_day += expense.price;
        total_expenses_month += 1;
      }
    }

    return {
      total_expenses_month,
      total_expenses_day,
      count_expenses_month,
      count_expenses_day,
    };
  }
}
