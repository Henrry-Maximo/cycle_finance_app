import { Expense } from "generated/prisma/client";
import { ExpensesRepository } from "../expenses-repository";
import { ExpenseCreateInput } from "generated/prisma/models";
import { QueryMode } from "generated/prisma/internal/prismaNamespace";
import { randomUUID } from "node:crypto";

export class InMemoryExpensesRepository implements ExpensesRepository {
  public items: Expense[] = [];

  async create(data: ExpenseCreateInput) {
    const expense = {
      id: data.id ?? String(randomUUID()),
      title: data.title,
      enterprise: data.enterprise,
      description: data.description ?? null,
      cnpj: data.cnpj ?? null,
      source: data.source ?? null,
      price: data.price,
      card_last_digits: data.card_last_digits,
      created_at: new Date(),
      user_id: data.user.connect?.id!,
      category_id: data.category.connect?.id!
    };

    this.items.push(expense);

    return expense;
  }

  async findManyByUserId(userId: string, contains: string, mode: QueryMode, page: number) {
    const expenses = this.items.filter((item) => {
      if (item.user_id === userId) {
        if (mode === "insensitive") {
          return item.title.toLowerCase().includes(contains.toLowerCase())
        }

        return item.title.includes(contains);
      }
    }).slice((page - 1) * 20, page * 20);

    return expenses;
  }

  async summaryByUserId(userId: string) {
    const data = this.items.filter((item) => item.user_id === userId);

    const today = new Date(); // get current date
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // get first day of the month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // get last day of the month

    let total_expenses_month = 0; // price number on month
    let count_expenses_month = 0; // total number on month
    let total_expenses_day = 0; // price number on day
    let count_expenses_day = 0; // total number on day
    
    for (const expense of data) {
      if (expense.created_at >= startOfMonth && expense.created_at <= endOfMonth) {
        total_expenses_month += expense.price;
        count_expenses_month++;
      };

      if (expense.created_at.toDateString() === today.toDateString()) {
        total_expenses_day += expense.price;
        count_expenses_day++;
      };
    };

    return {
      total_expenses_day,
      count_expenses_day,
      total_expenses_month,
      count_expenses_month,
    };
  }
}