import { InMemoryCategoriesRepository } from "@/repositories/in-memory/in-memory-categories-repository";
import { InMemoryExpensesRepository } from "@/repositories/in-memory/in-memory-expenses-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { NotAuthorizedError } from "./errors/not-authorized-error";
import { DeleteUserUseCase } from "./delete-user";

let expensesRepository: InMemoryExpensesRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let usersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe("Delete User Use Case", () => {
  beforeEach(() => {
    expensesRepository = new InMemoryExpensesRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    usersRepository = new InMemoryUsersRepository();

    sut = new DeleteUserUseCase(
      usersRepository
    );
  });

  it("should be able to delete an user", async () => {
    const { id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      sut.execute({ id, userId: id })
    ).resolves.toBeNull();
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
      sut.execute({ id, userId: userOther.id })
    ).rejects.toBeInstanceOf(NotAuthorizedError);
  });
});