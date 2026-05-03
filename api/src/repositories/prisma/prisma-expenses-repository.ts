import { ExpenseCreateInput } from "generated/prisma/models";
import { ExpensesRepository } from "../expenses-repository";
import { prisma } from "@/lib/prisma";

export class PrismaExpensesRepository implements ExpensesRepository {
  async create(data: ExpenseCreateInput) {
    const expense = await prisma.expense.create({
      data
    });

    return expense
  }
}