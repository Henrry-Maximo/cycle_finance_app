import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";
import { RegisterExpensesUseCase } from "./register-expenses";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let expensesRepository: InMemoryExpensesRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let sut: RegisterExpensesUseCase;

describe("Register Expenses Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    expensesRepository = new InMemoryExpensesRepository();
    categoriesRepository = new InMemoryCategoriesRepository();

    sut = new RegisterExpensesUseCase(
      expensesRepository,
      usersRepository,
      categoriesRepository,
    );
  });

  it("should be able to register expenses", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const categoryCreated = await categoriesRepository.create({
      title: "Alimentação",
      description: "Categoria criada para ser usada com qualquer tipo de compra que envolva alimentos.",
      user: {
        connect: {
          id: userCreated.id
        }
      }
    });

    const { expense } = await sut.execute({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 10.60,
      card_last_digits: "2343",
      createdAt: new Date(),
      user_id: userCreated.id,
      category_id: categoryCreated.id
    });

    // console.log("preço convertido: ", expense.price * 100);
    // console.log("preço original: ", expense.price / 100);
    expect(expense.id).toEqual(expect.any(String));
    expect(expense).toEqual(expect.objectContaining({ title: "Pães" }));
    expect(expense).toEqual(expect.objectContaining({ price: 1060 }));
  });
});
