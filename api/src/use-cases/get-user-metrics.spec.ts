import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let expensesRepository: InMemoryExpensesRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    expensesRepository = new InMemoryExpensesRepository();
    sut = new GetUserMetricsUseCase(usersRepository, expensesRepository);
  });

  it("should be able to get expenses count from metrics", async () => {
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
      price: 2 * 100,
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
      price: 3 * 100,
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
      price: 2 * 100,
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

    const date = new Date();
    date.setDate(date.getDate() - 1);
    const yesterday = date.toISOString();
    // let hours = ("0" + (date.getHours() + 21)).slice(-2);
    // let minutes = ("0" + date.getMinutes()).slice(-2);
    // let seconds = ("0" + date.getSeconds()).slice(-2);
    // let milliseconds = date.getMilliseconds();

    // let yesterday = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    // console.log(date);
    // console.log(yesterday);

    await expensesRepository.create({
      title: "Leite",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 2 * 100,
      card_last_digits: "2343",
      created_at: yesterday,
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

    const {
      count_expenses_day,
      count_expenses_month,
      total_expenses_day,
      total_expenses_month,
    } = await sut.execute({
      userId: userCreated.id,
    });

    // console.log(
    //   `Quantidade de despesas do dia: ${count_expenses_day}\n`,
    //   `Quantidade de despesas no mês: ${count_expenses_month}\n`,
    //   `Total de despesas no dia (preço): ${total_expenses_day}\n`,
    //   `Total de despeas no mês (preço): ${total_expenses_month}`,
    // );

    // console.log(`here: ${count_expenses_day}`);
    expect(count_expenses_day).toEqual(3);
    expect(count_expenses_month).toEqual(4);
    expect(total_expenses_day).toEqual(7);
    expect(total_expenses_month).toEqual(9);
  });

  it("should be able to get metrics of user if not found", async () => {
    await expect(async () =>
      sut.execute({
        userId: "id-non-existing",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
