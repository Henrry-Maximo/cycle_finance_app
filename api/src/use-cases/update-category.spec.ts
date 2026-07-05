import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { UpdateCategoryUseCase } from "./update-category";

let usersRepository: InMemoryUsersRepository;
let expensesRepository: InMemoryExpensesRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let sut: UpdateCategoryUseCase;

describe("Update Category from User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    expensesRepository = new InMemoryExpensesRepository();
    categoriesRepository = new InMemoryCategoriesRepository();

    sut = new UpdateCategoryUseCase(usersRepository, categoriesRepository);
  });

  it("should be able to update category from user", async () => {
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

    const { category } = await sut.execute({
      userId: userCreated.id,
      categoryId: categoryCreated.id,
      title: "Transporte",
      description: "Categoria com descrição nova.",
    });

    // console.log(expense);

    expect(category.id).toEqual(expect.any(String));
    expect(category.title).toEqual("Transporte");
    expect(category.description).toEqual("Categoria com descrição nova.");
  });

  it("should not be able to update expense with wrong id user", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
        categoryId: "",
        title: "",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
