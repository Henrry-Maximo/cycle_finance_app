import { RequestResetPasswordUseCase } from "../reset-password";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeRequestResetPassword() {
  const usersRepository = new PrismaUsersRepository();
  
  const requestResetPasswordTokensUseCase = new RequestResetPasswordUseCase(
    usersRepository
  );

  return requestResetPasswordTokensUseCase;
}
