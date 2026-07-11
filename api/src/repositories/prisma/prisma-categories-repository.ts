import { Category, Prisma } from "@/generated/prisma/client";
import { CategoryCreateInput } from "@/generated/prisma/models";
import { prisma } from "@/lib/prisma";

import { CategoriesRepository } from "../categories-repository";

export class PrismaCategoriesRespository implements CategoriesRepository {
  async findManyById(id: string): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: {
        user_id: id,
      },
    });

    return categories;
  }
  async create(data: CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    });

    return category;
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }

  async findManyByUserId(
    userId: string,
    categoryName: string,
    pageIndex: number,
    perPage: number,
  ) {
    const categories = await prisma.category.findMany({
      skip: (pageIndex - 1) * perPage,
      take: perPage,
      where: {
        user_id: {
          equals: userId,
        },
        title: {
          contains: categoryName,
          mode: "insensitive",
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return categories;
  }

  async findByName(name: string, userId: string) {
    const category = await prisma.category.findFirst({
      where: {
        title: name,
        user_id: userId,
      },
    });

    return category;
  }

  async findManyExpensesById(id: string) {
    const expenses = await prisma.expense.findMany({
      where: {
        category_id: id,
      },
    });

    return expenses;
  }

  async countByUserId(userId: string, categoryName: string) {
    const countRecords = await prisma.category.count({
      where: {
        title: {
          contains: categoryName,
          mode: "insensitive",
        },
        user_id: {
          equals: userId,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return countRecords;
  }

  async update(
    id: string,
    data: Omit<Prisma.CategoryUpdateInput, "id" | "user" | "created_at">,
  ) {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data,
    });

    return category;
  }

  async delete(id: string) {
    await prisma.category.delete({
      where: {
        id,
      },
    });

    return null;
  }

  async deleteByUserId(userId: string) {
    await prisma.category.deleteMany({
      where: {
        user_id: userId,
      },
    });
  }
}
