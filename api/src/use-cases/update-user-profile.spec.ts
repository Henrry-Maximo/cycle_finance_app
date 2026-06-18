import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UpdateUserProfileUseCase } from "./update-user-profile";

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserProfileUseCase;

describe("Update User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserProfileUseCase(usersRepository);
  });

  it("should be able to update user profile", async () => {
    const { id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: id,
      name: "John Doe 2",
      email: "johndoe2@example.com",
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe 2");
    expect(user.email).toEqual("johndoe2@example.com");
  });

  it("should not be able to update user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
