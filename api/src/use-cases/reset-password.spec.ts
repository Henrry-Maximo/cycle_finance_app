import { beforeEach, describe, expect, it } from "vitest";
import { ResetPasswordUseCase } from "./reset-password";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryResetPasswordTokensRepository } from "@/repositories/in-memory/in-memory-reset-password-tokens-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResetPasswordTokensRepository } from "@/repositories/reset-password-tokens-repository";
import { hash } from "bcryptjs";
import { randomBytes } from "node:crypto";
import { RequestResetPasswordUseCase } from "./request-reset-password";

let usersRepository: UsersRepository;
let resetPasswordTokensRepository: ResetPasswordTokensRepository;
let requestResetPasswordUseCase: RequestResetPasswordUseCase;
let sut: ResetPasswordUseCase;

describe("Reset Password Token Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    resetPasswordTokensRepository = new InMemoryResetPasswordTokensRepository();
    requestResetPasswordUseCase = new RequestResetPasswordUseCase(
      usersRepository,
      resetPasswordTokensRepository,
    );

    sut = new ResetPasswordUseCase(
      usersRepository,
      resetPasswordTokensRepository,
    );
  });

  it.skip("should be able to register a new password", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    // const expiresAt = new Date();
    // expiresAt.setHours(expiresAt.getHours() + 2);
    // const base64UrlString = randomBytes(32).toString("base64url");

    // const url = await resetPasswordTokensRepository.create({
    //   expires_at: expiresAt,
    //   token: base64UrlString,
    //   user: {
    //     connect: {
    //       id,
    //     },
    //   },
    // });

    const url = await requestResetPasswordUseCase.execute({
      email: user.email,
    });

    // await expect(
    //   sut.execute({
    //     token: url,
    //     password: "password-new",
    //   }),
    // ).resolves.toEqual({ url: expect.any(String) }));
  });
});
