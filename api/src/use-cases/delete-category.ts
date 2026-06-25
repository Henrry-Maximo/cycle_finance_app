import { CategoriesRepository } from "@/repositories/categories-repository";

import { CategoryIsLinkedExpenseError } from "./errors/category-is-linked-expense-error";
import { NotAuthorizedError } from "./errors/not-authorized-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteCategoryUseCaseRequest {
  id: string;
  userId: string;
}

export class DeleteCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ id, userId }: DeleteCategoryUseCaseRequest): Promise<null> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new ResourceNotFoundError();
    }

    if (category.user_id != userId) {
      throw new NotAuthorizedError();
    }

    const expenses = await this.categoriesRepository.findManyExpensesById(
      category.id,
    );

    if (expenses.length > 0) {
      throw new CategoryIsLinkedExpenseError();
    }

    await this.categoriesRepository.delete(id);

    return null;
  }
}
