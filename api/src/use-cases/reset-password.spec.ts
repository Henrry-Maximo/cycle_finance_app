import { beforeEach, describe, expect, it } from "vitest";
import { ResetPasswordUseCase } from "./reset-password";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryResetPasswordTokensRepository } from "@/repositories/in-memory/in-memory-reset-password-tokens-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResetPasswordTokensRepository } from "@/repositories/reset-password-tokens-repository";
import { hash } from "bcryptjs";
import { randomBytes } from "node:crypto";
import { RequestResetPasswordUseCase } from "./request-reset-password";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { env } from "@/env";
import { ResetPasswordTokenInvalid } from "./errors/reset-password-token-invalid-error";

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

  it("should be able to register a new password", async () => {
    const user = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { url } = await requestResetPasswordUseCase.execute({
      email: user.email,
    });

    const token = new URL(url).searchParams.get("token")!;

    await expect(
      sut.execute({
        token,
        password: "password-new",
      }),
    ).resolves.toEqual(null);
  });

  it("should not be possible to validate a token if it does not exist", async () => {
    await expect(
      sut.execute({
        token: "non-token",
        password: "password-new",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be possible to validate a token if it is invalid", async () => {
    const { id } = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() - 2);

    const data = await resetPasswordTokensRepository.create({
      token: "non-token",
      expires_at: expiresAt,
      user: {
        connect: {
          id,
        },
      },
    });

    const url = `${env.APP_URL}/reset-password?token=${data.token}`;
    const token = new URL(url).searchParams.get("token")!;

    expect(() =>
      sut.execute({
        token,
        password: "new-password",
      }),
    ).rejects.toBeInstanceOf(ResetPasswordTokenInvalid);
  });
});
