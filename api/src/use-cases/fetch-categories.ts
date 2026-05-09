import { CategoriesRepository } from "@/repositories/categories-repository";
import { Category, Prisma } from "generated/prisma/client";

interface GetCategoriesUseCaseRequest {
  contains?: string;
  mode?: Prisma.QueryMode;
}

interface GetCategoriesUseCaseResponse {
  categories: Category[];
}

export class GetCategoriesUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository,
  ) { };

  async execute({ contains = "", mode = "default" }: GetCategoriesUseCaseRequest = {}): Promise<GetCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.findMany(contains, mode);

    return { categories };
  }
}
