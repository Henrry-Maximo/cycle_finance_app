import { Category, Prisma } from "generated/prisma/client";

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  findById(id: number): Promise<Category | null>;
}