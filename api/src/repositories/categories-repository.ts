import { Category, Expense, Prisma } from "@/generated/prisma/client";

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  findByName(name: string, userId: string): Promise<Category | null>;
  findById(id: string): Promise<Category | null>;
  findManyById(id: string): Promise<Category[]>;
  findManyByUserId(
    userId: string,
    categoryName: string,
    pageIndex: number,
    perPage: number,
  ): Promise<Category[]>;
  findManyExpensesById(id: string): Promise<Expense[]>;
  delete(id: string): Promise<null>;
}
