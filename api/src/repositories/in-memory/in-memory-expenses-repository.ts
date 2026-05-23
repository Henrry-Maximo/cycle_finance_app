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
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
      user_id: data.user.connect?.id!,
      category_id: data.category.connect?.id!,
    };

    this.items.push(expense);

    return expense;
  }

  async findManyByUserId(
    userId: string,
    contains: string,
    mode: QueryMode,
    page: number,
  ) {
    const expenses = this.items
      .filter((item) => {
        if (item.user_id === userId) {
          if (mode === "insensitive") {
            return item.title.toLowerCase().includes(contains.toLowerCase());
          }

          return item.title.includes(contains);
        }
      })
      .slice((page - 1) * 20, page * 20);

    return expenses;
  }

  async findManyByUserIdInPeriod(userId: string, from: Date, to: Date) {
    const expenses = this.items.filter(
      (item) =>
        item.user_id === userId &&
        item.created_at >= from &&
        item.created_at <= to,
    );

    return expenses;
  }
}
