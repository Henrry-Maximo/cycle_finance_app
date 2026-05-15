import { ExpenseCreateInput } from "generated/prisma/models";
import { ExpensesRepository } from "../expenses-repository";
import { prisma } from "@/lib/prisma";
import { Prisma } from "generated/prisma/client";

export class PrismaExpensesRepository implements ExpensesRepository {
  async create(data: ExpenseCreateInput) {
    const expense = await prisma.expense.create({
      data
    });

    return expense
  }

  async findManyByUserId(user_id: string, contains: string, mode: Prisma.QueryMode) {
    const expenses = await prisma.expense.findMany({
      where: {
        user_id: {
          equals: user_id
        },
        title: {
          contains,
          mode
        }
      },
    });

    return expenses;
  }

  async summaryByUserId(userId: string) {
    await prisma.expense.findMany({
      where: {
        user_id: userId
      }
    });

    let total_expenses_month = 0;
    let total_expenses_day = 0;
    let count_expenses_month = 0;
    let count_expenses_day = 0;

    return {
      total_expenses_month,
      total_expenses_day,
      count_expenses_month,
      count_expenses_day
    }
  }
}