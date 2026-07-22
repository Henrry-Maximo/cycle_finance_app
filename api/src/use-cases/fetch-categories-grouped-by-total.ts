import { CategoriesRepository } from "@/repositories/categories-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ExpensesRepository } from "@/repositories/expenses-repository";

interface FetchCategoriesGroupedByTotalRequest {
  userId: string;
}

interface CategoryItem {
  name: string;
  count: number;
  total: number;
}

interface FetchCategoriesGroupedByTotalResponse {
  categories: CategoryItem[];
}

export class FetchCategoriesGroupedByTotalUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private categoriesRepository: CategoriesRepository,
    private expensesRepository: ExpensesRepository,
  ) {}

  async execute({
    userId,
  }: FetchCategoriesGroupedByTotalRequest): Promise<FetchCategoriesGroupedByTotalResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const categoriesList = await this.categoriesRepository.findManyById(userId);

    const expenses =
      await this.expensesRepository.findManyByUserIdGrouped(userId);

    const categoriesWithTotals = categoriesList.map((category) => {
      const expensesOfCategory = expenses.filter((expense) => {
        return expense.category_id === category.id;
      });

      const total = expensesOfCategory.reduce(
        (acc, current) => acc + current.price / 100,
        0,
      );

      return {
        name: category.title,
        count: expensesOfCategory.length,
        total,
      };
    });

    return { categories: categoriesWithTotals };
  }
}
