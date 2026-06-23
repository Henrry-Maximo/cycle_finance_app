import { Prisma } from "@/generated/prisma/client";
import { ExpenseCreateInput } from "@/generated/prisma/models";
import { prisma } from "@/lib/prisma";

import { ExpensesRepository } from "../expenses-repository";

export class PrismaExpensesRepository implements ExpensesRepository {
  async create(data: ExpenseCreateInput) {
    const expense = await prisma.expense.create({
      data,
    });

    return expense;
  }

  async findById(id: string) {
    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    return expense;
  }

  async findManyByUserId(
    user_id: string,
    expenseName: string,
    pageIndex: number,
    perPage: number,
  ) {
    const expensesUser = await prisma.expense.findMany({
      skip: (pageIndex - 1) * perPage,
      take: perPage,
      where: {
        user_id: {
          equals: user_id,
        },
        title: {
          contains: expenseName,
          mode: "insensitive",
        },
      },
      orderBy: {
        created_at: "desc", // mais recente
      },
    });

    const expenses = expensesUser.map((expense) => {
      return {
        ...expense,
        price: expense.price / 100,
      };
    });

    return expenses;
  }

  async findManyByUserIdInPeriod(userId: string, from: Date, to: Date) {
    const expenses = await prisma.expense.findMany({
      where: {
        user_id: userId,
        created_at: {
          gte: from,
          lte: to,
        },
      },
    });

    return expenses;
  }

  async delete(id: string) {
    await prisma.expense.delete({
      where: {
        id,
      },
    });

    return null;
  }
}
