import {
  PasswordResetTokensCreateInput,
  PasswordResetTokensUpdateInput,
} from "@/generated/prisma/models";
import { prisma } from "@/lib/prisma";

import { ResetPasswordTokensRepository } from "../reset-password-tokens-repository";

export class PrismaResetPasswordTokensRepository implements ResetPasswordTokensRepository {
  async findByToken(token: string) {
    const resetPasswordTokens = await prisma.passwordResetTokens.findUnique({
      where: {
        token,
      },
    });

    return resetPasswordTokens;
  }

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

  async update(token: string, data: PasswordResetTokensUpdateInput) {
    await prisma.passwordResetTokens.update({
      where: {
        token,
      },
      data,
    });

    return null;
  }
}
