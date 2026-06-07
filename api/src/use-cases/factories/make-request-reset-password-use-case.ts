import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RequestResetPasswordUseCase } from "../request-reset-password";
import { PrismaResetPasswordTokensRepository } from "@/repositories/prisma/prisma-reset-password-tokens-repository";

export function makeRequestResetPassword() {
  const usersRepository = new PrismaUsersRepository();
  const resetPasswordTokensRepository =
    new PrismaResetPasswordTokensRepository();

  const requestResetPasswordTokensUseCase = new RequestResetPasswordUseCase(
    usersRepository,
    resetPasswordTokensRepository,
  );

  return requestResetPasswordTokensUseCase;
}
