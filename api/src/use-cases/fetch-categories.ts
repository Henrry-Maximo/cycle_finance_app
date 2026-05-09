import { CategoriesRepository } from "@/repositories/categories-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Category, Prisma } from "generated/prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchCategoriesUseCaseRequest {
  userId: string;
  contains?: string;
  mode?: Prisma.QueryMode;
}

interface FetchCategoriesUseCaseResponse {
  categories: Category[];
}

export class FetchCategoriesUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private categoriesRepository: CategoriesRepository,
  ) { };

  async execute({ userId, contains = "", mode = "default" }: FetchCategoriesUseCaseRequest): Promise<FetchCategoriesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const categories = await this.categoriesRepository.findManyByUserId(userId, contains, mode);

    return { categories };
  }
}
