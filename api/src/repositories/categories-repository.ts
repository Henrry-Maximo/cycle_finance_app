import { Category, Prisma } from "@/generated/prisma/client";

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  findByName(name: string, userId: string): Promise<Category | null>;
  findById(id: string): Promise<Category | null>;
  findManyById(id: string): Promise<Category[]>;
  findManyByUserId(
    userId: string,
    contains: string,
    mode: Prisma.QueryMode,
    page: number,
  ): Promise<Category[]>;
  delete(id: string): Promise<null>;
}
