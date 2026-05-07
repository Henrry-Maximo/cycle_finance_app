import { ExpenseCreateInput } from "generated/prisma/models";
import { ExpensesRepository } from "../expenses-repository";
import { prisma } from "@/lib/prisma";
import { Expense, Prisma } from "generated/prisma/client";

export class PrismaExpensesRepository implements ExpensesRepository {
  async create(data: ExpenseCreateInput) {
    const expense = await prisma.expense.create({
      data
    });

    return expense
  }

  async findMany(contains?: string, mode?: string) {
    let enumMode = mode ? mode : "insensitive";

    const expenses = await prisma.expense.findMany({
      where: {
        title: {
          contains: contains ?? "",
          mode: enumMode as Prisma.QueryMode
        }
      },
    });

    return expenses;
  }
}