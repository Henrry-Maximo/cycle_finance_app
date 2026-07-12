import { randomUUID } from "node:crypto";

import { Expense, Prisma } from "@/generated/prisma/client";
import { ExpenseCreateInput } from "@/generated/prisma/models";

import { ExpensesRepository } from "../expenses-repository";

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
      user_id: data.user.connect!.id!,
      category_id: data.category.connect!.id!,
    };

    this.items.push(expense);

    return expense;
  }

  async findById(id: string) {
    const expense = this.items.find((item) => item.id === id);

    if (!expense) return null;

    return expense;
  }

  async findManyByUserId(
    user_id: string,
    from: Date,
    to: Date,
    perPage: number,
    pageIndex: number,
    expenseName?: string,
    categoryName?: string,
  ) {
    const expenses = this.items
      .filter((item) => {
        if (item.user_id !== user_id) return false;

        if (
          expenseName &&
          !item.title.toLowerCase().includes(expenseName.toLowerCase())
        )
          return false;

        if (item.created_at < from || item.created_at > to) return false;

        return true;
      })
      .slice((pageIndex - 1) * perPage, pageIndex * perPage);

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

  async countByUserId(userId: string, expenseName: string) {
    const countRecords = this.items.filter((item) => {
      const matchesUser = item.user_id === userId;

      const matchesName = expenseName
        ? item.title.toLowerCase().includes(expenseName.toLowerCase())
        : true;

      return matchesUser && matchesName;
    });

    return countRecords.length;
  }

  async update(
    id: string,
    data: Omit<Prisma.ExpenseUpdateInput, "id" | "user" | "created_at">,
  ) {
    const expense = this.items.find((item) => item.id === id)!;

    const { category, ...restOfData } = data;

    Object.assign(expense, restOfData);

    if (category?.connect?.id) {
      expense.category_id = category.connect.id;
    }

    return expense;
  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id === id);

    if (index) {
      this.items.splice(index, 1);
    }

    return null;
  }

  async deleteByUserId(userId: string) {
    this.items = this.items.filter((item) => item.user_id !== userId);
  }
}
