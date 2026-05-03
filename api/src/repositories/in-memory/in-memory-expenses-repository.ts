import { Expense } from "generated/prisma/client";
import { ExpensesRepository } from "../expenses-repository";
import { ExpenseCreateInput } from "generated/prisma/models";

export class InMemoryExpensesRepository implements ExpensesRepository {
  public items: Expense[] = [];

  async create(data: ExpenseCreateInput) {
    const expense = {
      id: "expense-1",
      title: data.title,
      enterprise: data.enterprise,
      description: data.description,
      CNPJ: data.CNPJ,
      source: data.source,
      price: data.price,
      card_last_digits: data.card_last_digits,
      createdAt: new Date(),
      user_id: data.user,
      category_id: data.category
    };

    this.items.push(expense);

    return expense;
  }
}