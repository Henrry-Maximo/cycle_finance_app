import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { FetchExpensesUseCase } from "./fetch-expenses";

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let expensesRepository: InMemoryExpensesRepository;
let sut: FetchExpensesUseCase;

describe("Fetch User Expenses History Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    expensesRepository = new InMemoryExpensesRepository();
    sut = new FetchExpensesUseCase(usersRepository, expensesRepository);
  });

  it("should be able to fetch expenses history", async () => {
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

    const today = new Date();

    await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 10.6,
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

    const yasterday = new Date(today.getFullYear(), today.getMonth() - 1, 10);
    await expensesRepository.create({
      title: "Leite",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 5.6,
      card_last_digits: "2343",
      created_at: yasterday,
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
      pageIndex: 1,
    });

    expect(expenses).toHaveLength(2);
  });

  it("should be able to fetch paginated expenses history", async () => {
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

    for (let i = 1; i <= 32; i++) {
      await expensesRepository.create({
        id: `expense-${i}`,
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
    }

    const { expenses } = await sut.execute({
      userId: userCreated.id,
      pageIndex: 3,
    });

    expect(expenses).toHaveLength(2);
    expect(expenses).toEqual([
      expect.objectContaining({ id: "expense-31" }),
      expect.objectContaining({ id: "expense-32" }),
    ]);
  });

  it("should be able to fetch expenses history thorugh filter: name, from and to date", async () => {
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

    for (let i = 1; i <= 16; i++) {
      await expensesRepository.create({
        id: `expense-${i}`,
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
    }

    for (let i = 17; i <= 32; i++) {
      await expensesRepository.create({
        id: `expense-${i}`,
        title: "Salsicha",
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
    }

    const today = new Date();
    const { expenses } = await sut.execute({
      userId: userCreated.id,
      pageIndex: 1,
      expenseName: "Salsicha",
      from: new Date(today.getFullYear(), today.getMonth(), 1),
      to: new Date(today.getFullYear(), today.getMonth() + 1, 0),
    });

    expect(expenses).toHaveLength(15);
  });

  it("should not be able to fetch expenses history if user id not exists", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
        pageIndex: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
