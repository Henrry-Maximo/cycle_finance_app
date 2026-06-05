import { ExpenseCreateInput } from "@/generated/prisma/models";
import { ExpensesRepository } from "../expenses-repository";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

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
        id
      }
    });
    
    return expense;
  }
  
  async findManyByUserId(
    user_id: string,
    contains: string,
    mode: Prisma.QueryMode,
  ) {
    const expensesUser = await prisma.expense.findMany({
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
        id
      }
    });

    return null;
  }
}
