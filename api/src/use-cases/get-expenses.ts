import { ExpensesRepository } from "@/repositories/expenses-repository";
import { Expense, Prisma } from "generated/prisma/client";

interface GetExpensesUseCaseRequest {
  contains: string;
  mode: Prisma.QueryMode;
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
    console.log(expenses);

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