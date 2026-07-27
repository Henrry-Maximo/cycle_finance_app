import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { FetchExpensesGroupedByDateUseCase } from "./fetch-expenses-grouped-by-date";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let expensesRepository: InMemoryExpensesRepository;
let sut: FetchExpensesGroupedByDateUseCase;

describe("Fetch User Expenses Grouped By Date Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    expensesRepository = new InMemoryExpensesRepository();
    sut = new FetchExpensesGroupedByDateUseCase(
      usersRepository,
      expensesRepository,
    );
  });

  it("should be able to fetch expenses grouped by date", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const categoryCreated = await categoriesRepository.create({
      title: "Alimentação",
      description: "Categoria criada para fiscalizar as compras de alimentos",
      user: {
        connect: { id: userCreated.id },
      },
    });

    await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 10.6,
      card_last_digits: "2343",
      created_at: new Date(),
      user: {
        connect: {
          id: userCreated.id,
        },
      },
      category: {
        connect: {
          id: categoryCreated.id,
        },
      },
    });

    await expensesRepository.create({
      title: "Leite",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 5.6,
      card_last_digits: "2343",
      created_at: new Date(),
      user: {
        connect: {
          id: userCreated.id,
        },
      },
      category: {
        connect: {
          id: categoryCreated.id,
        },
      },
    });

    const today = new Date();
    today.setDate(today.getDate() - 1);
    await expensesRepository.create({
      title: "Leite",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 5.6,
      card_last_digits: "2343",
      created_at: today,
      user: {
        connect: {
          id: userCreated.id,
        },
      },
      category: {
        connect: {
          id: categoryCreated.id,
        },
      },
    });

    await expensesRepository.create({
      title: "Leite",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 5.6,
      card_last_digits: "2343",
      created_at: today,
      user: {
        connect: {
          id: userCreated.id,
        },
      },
      category: {
        connect: {
          id: categoryCreated.id,
        },
      },
    });

    const { expenses } = await sut.execute({
      userId: userCreated.id,
    });

    expect(expenses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: 16.2 }),
        expect.objectContaining({ value: 11.2 }),
      ]),
    );
  });

  it("should be not able to fetch expenses grouped by date if user not found", async () => {
    await expect(() =>
      sut.execute({
        userId: "id-non-existing",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
