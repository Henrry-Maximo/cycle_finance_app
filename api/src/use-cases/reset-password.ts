import { hash } from "bcryptjs";

import { ResetPasswordTokensRepository } from "@/repositories/reset-password-tokens-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { ResetPasswordTokenInvalid } from "./errors/reset-password-token-invalid-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface PasswordUseCaseRequest {
  token: string;
  password: string;
}

export class ResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private resetPasswordTokensRepository: ResetPasswordTokensRepository,
  ) {}

  async execute({ token, password }: PasswordUseCaseRequest): Promise<null> {
    const resetPasswordTokens =
      await this.resetPasswordTokensRepository.findByToken(token);

    if (!resetPasswordTokens) {
      throw new ResourceNotFoundError();
    }

    const { expires_at, used_at, user_id } = resetPasswordTokens;
    if (expires_at <= new Date()) {
      throw new ResetPasswordTokenInvalid();
    }

    if (used_at) {
      throw new ResetPasswordTokenInvalid();
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    await this.usersRepository.update(user.id, {
      password_hash: await hash(password, 6),
    });
    await this.resetPasswordTokensRepository.update(token, {
      used_at: new Date(),
    });

    return null;
  }
}
