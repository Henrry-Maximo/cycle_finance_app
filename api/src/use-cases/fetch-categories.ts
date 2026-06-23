import { Category, Prisma } from "@/generated/prisma/client";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchCategoriesUseCaseRequest {
  userId: string;
  categoryName?: string;
  pageIndex?: number;
  perPage?: number;
}

interface Pagination {
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

interface FetchCategoriesUseCaseResponse {
  categories: Category[];
  meta: Pagination;
}

export class FetchCategoriesUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    userId,
    categoryName = "",
    pageIndex = 1,
    perPage = 15,
  }: FetchCategoriesUseCaseRequest): Promise<FetchCategoriesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const categories = await this.categoriesRepository.findManyByUserId(
      userId,
      categoryName,
      pageIndex,
      perPage,
    );

    const totalCount = categories.length;
    const totalPages = Math.ceil(totalCount / perPage);

    return {
      categories,
      meta: {
        page: pageIndex,
        perPage,
        totalCount,
        totalPages,
      },
    };
  }
}
