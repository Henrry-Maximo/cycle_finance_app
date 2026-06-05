import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { DeleteCategoryUseCase } from "./delete-category";
import { NotAuthorizedError } from "./errors/not-authorized-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let categoriesRepository: InMemoryCategoriesRepository;
let usersRepository: InMemoryUsersRepository;
let sut: DeleteCategoryUseCase;

describe("Delete Category Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryCategoriesRepository();
    usersRepository = new InMemoryUsersRepository();

    sut = new DeleteCategoryUseCase(categoriesRepository);
  });

  it("should be able to delete an category", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { id } = await categoriesRepository.create({
      title: "Alimentação",
      description:
        "Categoria criada para ser usada com qualquer tipo de compra que envolva alimentos.",
      user: {
        connect: {
          id: userCreated.id,
        },
      },
    });

    await expect(
      sut.execute({ id, userId: userCreated.id }),
    ).resolves.toBeNull();
  });

  it("should not be able to delete an category if it is not from the same user that attempting", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const userOther = await usersRepository.create({
      name: "Robert Doe",
      email: "robertdoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { id } = await categoriesRepository.create({
      title: "Alimentação",
      description:
        "Categoria criada para ser usada com qualquer tipo de compra que envolva alimentos.",
      user: {
        connect: {
          id: userCreated.id,
        },
      },
    });

    await expect(
      sut.execute({ id, userId: userOther.id }),
    ).rejects.toBeInstanceOf(NotAuthorizedError);
  });

  it("should not be able to delete an category that does not exist from user", async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      sut.execute({ id: "non-expense", userId: userCreated.id }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
