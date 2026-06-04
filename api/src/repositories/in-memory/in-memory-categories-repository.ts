import { Category } from "generated/prisma/client";
import { CategoriesRepository } from "../categories-repository";
import { CategoryCreateInput } from "generated/prisma/models";
import { QueryMode } from "generated/prisma/internal/prismaNamespace";
import { randomUUID } from "node:crypto";

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = [];

  async create(data: CategoryCreateInput) {
    const category = {
      id: data.id ?? String(randomUUID()),
      title: data.title,
      description: data.description ?? null,
      created_at: new Date(),
      user_id: data.user.connect?.id!,
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
    contains: string,
    mode: QueryMode,
    page: number,
  ): Promise<Category[]> {
    const categories = this.items
      .filter((item) => {
        if (item.user_id === userId) {
          if (mode === "insensitive") {
            return item.title.toLowerCase().includes(contains.toLowerCase());
          }

          return item.title.includes(contains);
        }
      })
      .slice((page - 1) * 20, page * 20);

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

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id === id);

    if (index) {
      this.items.splice(index, 1);
    }

    return null;
  }
}
