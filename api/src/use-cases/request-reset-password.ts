import { randomBytes } from "node:crypto";

import { env } from "@/env";
import { ResetPasswordTokensRepository } from "@/repositories/reset-password-tokens-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ResetPasswordUseCaseRequest {
  email: string;
}

interface ResetPasswordUseCaseResponse {
  url: string;
}

export class RequestResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private resetPasswordTokensRepository: ResetPasswordTokensRepository,
  ) {}

  async execute({
    email,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2);

    const base64UrlString = randomBytes(32).toString("base64url");
    const data = await this.resetPasswordTokensRepository.create({
      token: base64UrlString,
      expires_at: expiresAt,
      user: {
        connect: {
          id: user.id,
        },
      },
    });

    const url = `${env.APP_URL}/reset-password?token=${data.token}`;

    return { url };
  }
}
