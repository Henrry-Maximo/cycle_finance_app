import { PasswordResetTokensCreateInput } from "@/generated/prisma/models";
import { prisma } from "@/lib/prisma";

import { ResetPasswordTokensRepository } from "../reset-password-tokens-repository";

export class PrismaResetPasswordTokens implements ResetPasswordTokensRepository {
  async create(data: PasswordResetTokensCreateInput) {
    const tokenPayload = await prisma.passwordResetTokens.create({
      data,
    });

    return tokenPayload;
  }

  async findById(id: string) {
    const tokenPayload = await prisma.passwordResetTokens.findUnique({
      where: {
        id,
      },
    });

    return tokenPayload;
  }
}
