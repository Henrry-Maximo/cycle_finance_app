import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUsersUseCase } from "./fetch-users";

let usersRepository: InMemoryUsersRepository;
let sut: GetUsersUseCase;

describe("Get Users Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUsersUseCase(usersRepository);
  });

  it("should be able to get users", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe2@example.com",
      password_hash: await hash("123456", 6),
    });

    const { users } = await sut.execute({});

    expect(users).toHaveLength(2);
    expect(users).toEqual([
      expect.objectContaining({ email: "johndoe@example.com" }),
      expect.objectContaining({ email: "johndoe2@example.com" }),
    ]);
  });
});
