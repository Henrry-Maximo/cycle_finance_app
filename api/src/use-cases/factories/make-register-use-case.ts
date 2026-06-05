import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

import { RegisterUseCase } from "../register";

/*
 * Factories:
 * - Permite colocar todas as dependências necessárias do caso de uso a disposição, sendo
 * apenas necessário usar a função makeRegisterUseCase em sua controller responsável, que a make
 * ficará responsável por lidar com as possíveis dependências do caso de uso.
 */

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
