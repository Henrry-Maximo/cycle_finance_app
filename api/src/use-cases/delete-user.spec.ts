import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { DeleteUserUseCase } from "./delete-user";
import { NotAuthorizedError } from "./errors/not-authorized-error";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let expensesRepository: InMemoryExpensesRepository;
let sut: DeleteUserUseCase;

describe("Delete User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    expensesRepository = new InMemoryExpensesRepository();

    sut = new DeleteUserUseCase(
      usersRepository,
      expensesRepository,
      categoriesRepository,
    );
  });

  it("should be able to delete an user", async () => {
    const { id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(sut.execute({ id, userId: id })).resolves.toBeNull();
  });

  it("should be able to delete data all of user that it's delete", async () => {
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

    await sut.execute({ id: userCreated.id, userId: userCreated.id });

    const expense = await expensesRepository.findById(expenseCreated.id);
    const category = await categoriesRepository.findById(categoryCreated.id);

    expect(expense).toEqual(null);
    expect(category).toEqual(null);
  });

  it("should not be able to delete an user if it is not from the same user that attempting", async () => {
    const { id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const userOther = await usersRepository.create({
      name: "Robert Doe",
      email: "robertdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      sut.execute({ id, userId: userOther.id }),
    ).rejects.toBeInstanceOf(NotAuthorizedError);
  });
});
