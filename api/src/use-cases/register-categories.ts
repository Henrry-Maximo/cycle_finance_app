import { Category } from "@/generated/prisma/client";
import { CategoriesRepository } from "@/repositories/categories-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { CategoryAlreadyExistsError } from "./errors/category-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface RegisterCategoriesUseCaseRequest {
  id?: string;
  title: string;
  description?: string | null;
  created_at?: Date;
  user_id: string;
}

interface RegisterCategoriesUseCaseResponse {
  category: Category;
}

export class RegisterCategoriesUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    user_id,
    ...data
  }: RegisterCategoriesUseCaseRequest): Promise<RegisterCategoriesUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      data.title,
      user.id,
    );

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    const category = await this.categoriesRepository.create({
      title: data.title,
      description: data.description ?? null,
      user: {
        connect: {
          id: user.id,
        },
      },
    });

    return { category };
  }
}
