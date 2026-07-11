import { PasswordResetTokens, Prisma } from "@/generated/prisma/client";

export interface ResetPasswordTokensRepository {
  create(
    data: Prisma.PasswordResetTokensCreateInput,
  ): Promise<PasswordResetTokens>;
  findById(id: string): Promise<PasswordResetTokens | null>;
  findByToken(token: string): Promise<PasswordResetTokens | null>;
  update(
    id: string,
    data: Prisma.PasswordResetTokensUpdateInput,
  ): Promise<null>;
  deleteByUserId(userId: string): Promise<void>;
}
