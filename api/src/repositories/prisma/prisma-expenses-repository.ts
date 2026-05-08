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

  async findMany(contains: string, mode: Prisma.QueryMode) {
    const expenses = await prisma.expense.findMany({
      where: {
        title: {
          contains,
          mode
        }
      },
    });

    return expenses;
  }
}