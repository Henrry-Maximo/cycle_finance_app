import { compare } from "bcryptjs";
import { beforeEach,describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { RegisterUseCase } from "./register";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

// Test Unit
describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    // const prismaUsersRepository = new PrismaUsersRepository();
    // const usersRepository = new InMemoryUsersRepository();
    // const sut = new RegisterUseCase(usersRepository);

    const { user } = await sut.execute({
      username: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      username: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    // console.log(user.password_hash);
    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      username: "johndoe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        username: "johndoe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});

// test('check if it works', () => {
//   expect(2 + 2).toBe(4);
// });
