import { CategoriesRepository } from "@/repositories/categories-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Category } from "@/generated/prisma/client";
import { UsersRepository } from "@/repositories/users-repository";

interface UpdateCategoryUseCaseRequest {
  userId: string;
  categoryId: string;
  title?: string;
  description?: string;
}

interface UpdateCategoryUseCaseResponse {
  category: Category;
}

export class UpdateCategoryUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    userId,
    categoryId,
    ...data
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const categoryFinding =
      await this.categoriesRepository.findById(categoryId);

    if (!categoryFinding) {
      throw new ResourceNotFoundError();
    }

    if (user.id !== categoryFinding.user_id) {
      throw new ResourceNotFoundError();
    }

    const category = await this.categoriesRepository.update(categoryId, {
      title: data.title ? data.title : categoryFinding.title,
      description: data.description
        ? data.description
        : categoryFinding.description,
    });

    return { category };
  }
}
