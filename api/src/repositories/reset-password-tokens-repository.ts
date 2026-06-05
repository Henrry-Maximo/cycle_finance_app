import { Prisma, PasswordResetTokens } from "@/generated/prisma/client";

export interface ResetPasswordTokensRepository {
  create(data: Prisma.PasswordResetTokensCreateInput): Promise<PasswordResetTokens>;
  findById(id: string): Promise<PasswordResetTokens | null>;
}
