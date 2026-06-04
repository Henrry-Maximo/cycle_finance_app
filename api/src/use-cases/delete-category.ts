import { CategoriesRepository } from "@/repositories/categories-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAuthorizedError } from "./errors/not-authorized-error";

interface DeleteCategoryUseCaseRequest {
  id: string;
  userId: string;
}

export class DeleteCategoryUseCase {
  constructor(
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute({ id, userId }: DeleteCategoryUseCaseRequest): Promise<null> {
    const category = await this.categoriesRepository.findById(id);
    
    if (!category) {
      throw new ResourceNotFoundError();
    }
    
    if (category.user_id != userId) {
      throw new NotAuthorizedError();
    }
    
    await this.categoriesRepository.delete(id);

    return null;
  }
}
