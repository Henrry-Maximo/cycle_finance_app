import { Category, Prisma } from "generated/prisma/client";

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findManyByUserId(userId: string, contains: string, mode: Prisma.QueryMode, page: number): Promise<Category[]>;
}