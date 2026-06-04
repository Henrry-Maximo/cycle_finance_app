import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteExpenseUseCase } from "./delete-expense";

let expensesRepository: InMemoryExpensesRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let usersRepository: InMemoryUsersRepository;
let sut: DeleteExpenseUseCase;

describe("Delete Expense Use Case", () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    usersRepository = new InMemoryUsersRepository();

    sut = new DeleteExpenseUseCase(
      expensesRepository
    );
  });

  it("should be able to delete expense", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const categoryCreated = await categoriesRepository.create({
      title: "Alimentação",
      description:
        "Categoria criada para ser usada com qualquer tipo de compra que envolva alimentos.",
      user: {
        connect: {
          id: userCreated.id,
        },
      },
    });

    const { id, user_id } = await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 9.52,
      card_last_digits: "2343",
      user: {
        connect: {
          id: userCreated.id
        }
      },
      category: {
        connect: {
          id: categoryCreated.id
        }
      }
    });

    await expect(
      sut.execute({ id, userId: user_id })
    ).resolves.toBeNull();
  });
});