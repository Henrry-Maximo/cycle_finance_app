import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { RequestResetPasswordUseCase } from "../reset-password";

export function makeRequestResetPassword() {
  const usersRepository = new PrismaUsersRepository();

  const requestResetPasswordTokensUseCase = new RequestResetPasswordUseCase(
    usersRepository,
  );

  return requestResetPasswordTokensUseCase;
}
