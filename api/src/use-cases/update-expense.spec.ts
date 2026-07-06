import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";
import { UpdateExpenseUseCase } from "./update-expense";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { CategoryAlreadyInUseError } from "./errors/category-already-in-use-error";

let usersRepository: InMemoryUsersRepository;
let expensesRepository: InMemoryExpensesRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let sut: UpdateExpenseUseCase;

describe("Update Expense from User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    expensesRepository = new InMemoryExpensesRepository();
    categoriesRepository = new InMemoryCategoriesRepository();

    sut = new UpdateExpenseUseCase(
      usersRepository,
      expensesRepository,
      categoriesRepository,
    );
  });

  it("should be able to update expense from user", async () => {
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

    const categoryCreatedTwo = await categoriesRepository.create({
      title: "Transporte",
      description:
        "Categoria criada para ser usada com qualquer tipo de compra que envolva transporte.",
      user: {
        connect: {
          id: userCreated.id,
        },
      },
    });

    const expenseCreated = await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 9.52,
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

    const { expense } = await sut.execute({
      userId: userCreated.id,
      expenseId: expenseCreated.id,
      category: categoryCreatedTwo.id,
    });

    // console.log(expense);

    expect(expense.id).toEqual(expect.any(String));
    expect(expense.category_id).toEqual(categoryCreatedTwo.id);
  });

  it("should not be able to update expense with wrong id user", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
        expenseId: "",
        category: "",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to update expense that not exists", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        userId: userCreated.id,
        expenseId: "non-existing-id",
        category: "",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to update expense if user request is difference of expense user id", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const userOther = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const categoryCreated = await categoriesRepository.create({
      title: "Alimentação",
      user: {
        connect: {
          id: userOther.id,
        },
      },
    });

    const expenseCreated = await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 9.52,
      card_last_digits: "2343",
      created_at: new Date(),
      user: {
        connect: {
          id: userOther.id,
        },
      },
      category: {
        connect: {
          id: categoryCreated.id,
        },
      },
    });

    await expect(() =>
      sut.execute({
        userId: userCreated.id,
        expenseId: expenseCreated.id,
        category: "",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to update expense with the same category in use", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const categoryCreated = await categoriesRepository.create({
      title: "Alimentação",
      user: {
        connect: {
          id: userCreated.id,
        },
      },
    });

    const expenseCreated = await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 9.52,
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

    await expect(() =>
      sut.execute({
        userId: userCreated.id,
        expenseId: expenseCreated.id,
        category: categoryCreated.id,
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyInUseError);
  });

  it("should not be able to update expense with category that was not found", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const categoryCreated = await categoriesRepository.create({
      title: "Alimentação",
      user: {
        connect: {
          id: userCreated.id,
        },
      },
    });

    const expenseCreated = await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 9.52,
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

    await expect(() =>
      sut.execute({
        userId: userCreated.id,
        expenseId: expenseCreated.id,
        category: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to update expense if category not belonging from user", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const userOther = await usersRepository.create({
      name: "Ashita no Joe",
      email: "ashitanojoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const categoryCreated = await categoriesRepository.create({
      title: "Alimentação",
      user: {
        connect: {
          id: userCreated.id,
        },
      },
    });

    const categoryFromUserOther = await categoriesRepository.create({
      title: "Alimentação",
      user: {
        connect: {
          id: userOther.id,
        },
      },
    });

    const expenseCreated = await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 9.52,
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

    await expect(() =>
      sut.execute({
        userId: userCreated.id,
        expenseId: expenseCreated.id,
        category: categoryFromUserOther.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
