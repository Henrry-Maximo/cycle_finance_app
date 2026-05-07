import { ExpensesRepository } from "@/repositories/expenses-repository";
import { Expense } from "generated/prisma/client";

interface GetExpensesUseCaseRequest {
  contains?: string;
  mode?: string;
}

interface GetExpensesUseCaseResponse {
  expenses: Expense[];
}

export class GetExpensesUseCase {
  constructor(
    private expensesRepository: ExpensesRepository,
  ) { };

  async execute({ contains, mode }: GetExpensesUseCaseRequest): Promise<GetExpensesUseCaseResponse> {
    const expenses = await this.expensesRepository.findMany(contains, mode);

    return { expenses };
  }
}

// let filter = {} as {};
//   if (contains) {
//     filter = {
//       contains,
//       mode
//     };
//   };

//   const expenses = await prisma.expense.findMany({
//     where: {
//       title: filter
//     },
//   });