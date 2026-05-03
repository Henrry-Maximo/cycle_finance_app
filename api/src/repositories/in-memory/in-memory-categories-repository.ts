import { Category } from "generated/prisma/client";
import { CategoriesRepository } from "../categories-repository";
import { CategoryCreateInput } from "generated/prisma/models";

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = [];

  async create(data: CategoryCreateInput) {
    const category = {
      id: 1,
      title: data.title,
      description: data.description ?? null,
      created_at: new Date(),
      user_id: data.user.connect?.id!
    };

    this.items.push(category);

    return category;
  };

  async findById(id: number) {
    const category = this.items.find((item) => item.id === id);

    if (!category) return null;

    return category;
  };
}
