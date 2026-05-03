import { Category } from "generated/prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UsersRepository } from "@/repositories/users-repository";
import { CategoriesRepository } from "@/repositories/categories-repository";

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
  ) { }

  async execute({
    user_id,
    ...data
  }: RegisterCategoriesUseCaseRequest): Promise<RegisterCategoriesUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ResourceNotFoundError();
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
