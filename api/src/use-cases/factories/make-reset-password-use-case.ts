import { PrismaResetPasswordTokensRepository } from "@/repositories/prisma/prisma-reset-password-tokens-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ResetPasswordUseCase } from "../reset-password";

export function makeResetPassword() {
  const usersRepository = new PrismaUsersRepository();
  const resetPasswordTokensRepository =
    new PrismaResetPasswordTokensRepository();

  const resetPasswordTokensUseCase = new ResetPasswordUseCase(
    usersRepository,
    resetPasswordTokensRepository,
  );

  return resetPasswordTokensUseCase;
}
