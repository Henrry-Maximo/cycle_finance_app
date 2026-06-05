import { PasswordResetTokensCreateInput } from "@/generated/prisma/models";
import { ResetPasswordTokensRepository } from "../reset-password-tokens-repository";
import { prisma } from "@/lib/prisma";

export class PrismaResetPasswordTokens implements ResetPasswordTokensRepository {
  async create(data: PasswordResetTokensCreateInput) {
    const tokenPayload = await prisma.passwordResetTokens.create({
      data
    });

    return tokenPayload;
  }

  async findById(id: string) {
    const tokenPayload = await prisma.passwordResetTokens.findUnique({
      where: {
        id
      }
    });

    return tokenPayload;
  }
}
