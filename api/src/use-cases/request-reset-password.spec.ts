import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { randomBytes } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { RequestResetPasswordUseCase } from "./request-reset-password";
import { InMemoryResetPasswordTokensRepository } from "@/repositories/in-memory/in-memory-reset-password-tokens-repository";
import { ResetPasswordTokensRepository } from "@/repositories/reset-password-tokens-repository";

let usersRepository: UsersRepository;
let resetPasswordTokensRepository: ResetPasswordTokensRepository;
let sut: RequestResetPasswordUseCase;

describe('Request Reset Password Token Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    resetPasswordTokensRepository = new InMemoryResetPasswordTokensRepository();

    sut = new RequestResetPasswordUseCase(
      usersRepository,
      resetPasswordTokensRepository
    );
  });

  it("should be able to register request reset password from user", async  () => {
    const { email } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        email 
      })
    ).resolves.toEqual({ url: expect.any(String) });

  })
})