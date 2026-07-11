import { randomUUID } from "node:crypto";

import { Category } from "@/generated/prisma/client";
import {
  CategoryCreateInput,
  CategoryUpdateInput,
} from "@/generated/prisma/models";

import { CategoriesRepository } from "../categories-repository";
import { InMemoryExpensesRepository } from "./in-memory-expenses-repository";

export class InMemoryCategoriesRepository implements CategoriesRepository {
  constructor(private expensesRepository?: InMemoryExpensesRepository) {}

  public items: Category[] = [];

  async create(data: CategoryCreateInput) {
    const category = {
      id: data.id ?? String(randomUUID()),
      title: data.title,
      description: data.description ?? null,
      created_at: new Date(),
      user_id: data.user.connect!.id!,
    };

    this.items.push(category);

    return category;
  }

  async findById(id: string) {
    const category = this.items.find((item) => item.id === id);

    if (!category) return null;

    return category;
  }

  async findManyByUserId(
    userId: string,
    categoryName: string,
    pageIndex: number,
    perPage: number,
  ): Promise<Category[]> {
    const categories = this.items
      .filter((item) => {
        if (item.user_id === userId) {
          return item.title.toLowerCase().includes(categoryName.toLowerCase());
        }
      })
      .slice((pageIndex - 1) * perPage, pageIndex * perPage);

    return categories;
  }

  async findByName(name: string, userId: string) {
    const category = this.items.find(
      (item) => item.title === name && item.user_id === userId,
    );

    if (!category) {
      return null;
    }

    return category;
  }

  async findManyById(id: string) {
    const categories = this.items.filter((item) => item.user_id === id);

    return categories;
  }

  async findManyExpensesById(id: string) {
    const expenses =
      this.expensesRepository?.items.filter(
        (item) => item.category_id === id,
      ) ?? [];

    return expenses;
  }

  async countByUserId(userId: string, categoryName: string) {
    const countRecords = this.items.filter((item) => {
      const matchesUser = item.user_id === userId;

      const matchesName = categoryName
        ? item.title.toLowerCase().includes(categoryName.toLowerCase())
        : true;

      return matchesUser && matchesName;
    });

    return countRecords.length;
  }

  async update(id: string, data: CategoryUpdateInput) {
    const category = this.items.find((item) => item.id == id)!;

    Object.assign(category, data);

    return category;
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
