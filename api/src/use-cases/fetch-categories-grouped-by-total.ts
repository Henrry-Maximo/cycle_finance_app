import { CategoriesRepository } from "@/repositories/categories-repository";
import { ExpensesRepository } from "@/repositories/expenses-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchCategoriesGroupedByTotalRequest {
  userId: string;
}

type FetchCategoriesGroupedByTotalResponse = {
  name: string;
  count: number;
  total: number;
}[];

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

    // relaciona categorias com despesas gerando insight sobre cada categoria
    const categoriesWithTotals = categoriesList.map((category) => {
      const expensesFromCategory = expenses.filter((expense) => {
        return expense.category_id === category.id;
      });

      const total = expensesFromCategory.reduce(
        (acc, current) => acc + current.price,
        0,
      );

      return {
        name: category.title,
        count: expensesFromCategory.length,
        total,
      };
    });

    return categoriesWithTotals;
  }
}
