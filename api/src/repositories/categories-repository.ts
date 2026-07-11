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
  countByUserId(userId: string, categoryName: string): Promise<number>;
  update(
    id: string,
    data: Omit<Prisma.CategoryUpdateInput, "id" | "user" | "created_at">,
  ): Promise<Category>;
  delete(id: string): Promise<null>;
  deleteByUserId(userId: string): Promise<void>;
}
