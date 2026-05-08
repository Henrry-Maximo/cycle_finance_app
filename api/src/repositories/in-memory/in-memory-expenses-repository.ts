import { Expense } from "generated/prisma/client";
import { ExpensesRepository } from "../expenses-repository";
import { ExpenseCreateInput } from "generated/prisma/models";
import { QueryMode } from "generated/prisma/internal/prismaNamespace";

export class InMemoryExpensesRepository implements ExpensesRepository {
  public items: Expense[] = [];

  async create(data: ExpenseCreateInput) {
    const expense = {
      id: "expense-1",
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

  findMany(contains: string, mode: QueryMode): Promise<Expense[]> {
    throw new Error("Method not implemented.");
  }
}