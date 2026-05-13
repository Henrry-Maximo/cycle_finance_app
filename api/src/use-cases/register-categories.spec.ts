import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { hash } from "bcryptjs";
import { RegisterCategoriesUseCase } from "./register-categories";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CategoryAlreadyExistsError } from "./errors/category-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let sut: RegisterCategoriesUseCase;

describe("Register Categories Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();

    sut = new RegisterCategoriesUseCase(usersRepository, categoriesRepository);
  });

  it("should be able to register categories", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { category } = await sut.execute({
      title: "Alimentação",
      description:
        "Categoria criada para ser usada com qualquer tipo de compra que envolva alimentos.",
      user_id: userCreated.id,
    });

    expect(category.title).toEqual(expect.any(String));
    expect(category).toEqual(expect.objectContaining({ title: "Alimentação" }));
  });

  it("should not be able to register category if user not exists", async () => {
    await expect(async () =>
      sut.execute({
        title: "Alimentação",
        description:
          "Categoria criada para ser usada com qualquer tipo de compra que envolva alimentos.",
        user_id: "user-01",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to register category if same already exists", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { category } = await sut.execute({
      title: "Alimentação",
      description: "Categoria criada para ser usada com qualquer tipo de compra que envolva alimentos.",
      user_id: userCreated.id,
    });

    await expect(async () =>
      sut.execute({
        title: category.title,
        description: category.description,
        user_id: category.user_id,
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError);
  });
});
