import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryResetPasswordTokensRepository } from "@/repositories/in-memory/in-memory-reset-password-tokens-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResetPasswordTokensRepository } from "@/repositories/reset-password-tokens-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { RequestResetPasswordUseCase } from "./request-reset-password";

let usersRepository: UsersRepository;
let resetPasswordTokensRepository: ResetPasswordTokensRepository;
let sut: RequestResetPasswordUseCase;

describe("Request Reset Password Token Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    resetPasswordTokensRepository = new InMemoryResetPasswordTokensRepository();

    sut = new RequestResetPasswordUseCase(
      usersRepository,
      resetPasswordTokensRepository,
    );
  });

  it("should be able to register request reset password from user", async () => {
    const { email } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        email,
      }),
    ).resolves.toEqual({ url: expect.any(String) });
  });

  it("should be not able register request reset password if user not exists", async () => {
    await expect(
      sut.execute({
        email: "non-email",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
