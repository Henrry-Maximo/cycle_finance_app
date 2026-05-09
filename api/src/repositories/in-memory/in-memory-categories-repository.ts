import { Category } from "generated/prisma/client";
import { CategoriesRepository } from "../categories-repository";
import { CategoryCreateInput } from "generated/prisma/models";
import { QueryMode } from "generated/prisma/internal/prismaNamespace";
import { randomUUID } from "node:crypto";

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = [];

  async create(data: CategoryCreateInput) {
    const category = {
      id: String(randomUUID()),
      title: data.title,
      description: data.description ?? null,
      created_at: new Date(),
      user_id: data.user.connect?.id!
    };

    this.items.push(category);

    return category;
  };

  async findById(id: string) {
    const category = this.items.find((item) => item.id === id);

    if (!category) return null;

    return category;
  };

  async findMany(contains: string, mode: QueryMode): Promise<Category[]> {
    const categories = this.items.filter((item) => {
      if (mode === "insensitive") {
        return item.title.toLowerCase().includes(contains.toLowerCase())
      }

      return item.title.includes(contains);
    });

    return categories;
  };
}
