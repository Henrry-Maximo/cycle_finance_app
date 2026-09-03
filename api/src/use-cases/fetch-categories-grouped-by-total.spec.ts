import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { FetchCategoriesGroupedByTotalUseCase } from "./fetch-categories-grouped-by-total";

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let expensesRepository: InMemoryExpensesRepository;
let sut: FetchCategoriesGroupedByTotalUseCase;

describe("Fetch User Categories Grouped By Total Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    expensesRepository = new InMemoryExpensesRepository();

    sut = new FetchCategoriesGroupedByTotalUseCase(
      usersRepository,
      categoriesRepository,
      expensesRepository,
    );
  });

  it("should be able to fetch categories grouped by total", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("12345", 6),
    });

    const categoryFood = await categoriesRepository.create({
      title: "Alimentação",
      user: {
        connect: {
          id: userCreated.id,
        },
      },
    });

    const categoryTransport = await categoriesRepository.create({
      title: "Transporte",
      user: {
        connect: {
          id: userCreated.id,
        },
      },
    });

    await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 10 * 100,
      card_last_digits: "2343",
      created_at: new Date(),
      user: {
        connect: {
          id: userCreated.id,
        },
      },
      category: {
        connect: {
          id: categoryFood.id,
        },
      },
    });

    await expensesRepository.create({
      title: "Mortadela",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 20 * 100,
      card_last_digits: "2343",
      created_at: new Date(),
      user: {
        connect: {
          id: userCreated.id,
        },
      },
      category: {
        connect: {
          id: categoryFood.id,
        },
      },
    });

    await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 10.6 * 100,
      card_last_digits: "2343",
      created_at: new Date(),
      user: {
        connect: {
          id: userCreated.id,
        },
      },
      category: {
        connect: {
          id: categoryTransport.id,
        },
      },
    });

    await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 30.6 * 100,
      card_last_digits: "2343",
      created_at: new Date(),
      user: {
        connect: {
          id: userCreated.id,
        },
      },
      category: {
        connect: {
          id: categoryTransport.id,
        },
      },
    });

    await expect(
      sut.execute({
        userId: userCreated.id,
      }),
    ).resolves.toEqual({
      categories: expect.arrayContaining([
        { name: "Alimentação", count: 2, total: 30 },
        { name: "Transporte", count: 2, total: 41.2 },
      ]),
    });
  });

  it("should be not able to fetch categories grouped by total if user not found", async () => {
    await expect(() =>
      sut.execute({
        userId: "id-non-existing",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
