import { randomUUID } from "node:crypto";

import { PasswordResetTokens } from "@/generated/prisma/client";
import { PasswordResetTokensCreateInput } from "@/generated/prisma/models";

import { ResetPasswordTokensRepository } from "../reset-password-tokens-repository";

export class InMemoryResetPasswordTokensRepository implements ResetPasswordTokensRepository {
  public items: PasswordResetTokens[] = [];

  async create(data: PasswordResetTokensCreateInput) {
    const tokenPayload = {
      id: data.id ?? String(randomUUID()),
      token: data.token,
      created_at: data.created_at ? new Date(data.created_at) : new Date(),
      expires_at: new Date(data.expires_at),
      used_at: data.used_at ? new Date(data.used_at) : null,
      user_id: data.user.connect!.id!,
    };

    this.items.push(tokenPayload);

    return tokenPayload;
  }

  async findById(id: string) {
    const tokenPayload = this.items.find((item) => item.id === id);

    if (!tokenPayload) {
      return null;
    }

    return tokenPayload;
  }
}
