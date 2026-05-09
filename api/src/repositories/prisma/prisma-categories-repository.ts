import { Prisma } from "generated/prisma/client";
import { CategoryCreateInput } from "generated/prisma/models";
import { CategoriesRepository } from "../categories-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCategoriesRespository implements CategoriesRepository {
  async create(data: CategoryCreateInput) {
    const category = await prisma.category.create({
      data,
    });

    return category;
  };

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  };

  async findManyByUserId(userId: string, contains: string, mode: Prisma.QueryMode) {
    const categories = await prisma.category.findMany({
      where: {
        user_id: {
          equals: userId
        },
        title: {
          contains,
          mode
        }
      },
    });

    return categories;
  }
}
