import { hash } from "bcryptjs";

import { User } from "@/generated/prisma/client";
import { UsersRepository } from "@/repositories/users-repository";

import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  username: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const emailFormatting = email.trim().toLowerCase();
    const userWithSameEmail =
      await this.usersRepository.findByEmail(emailFormatting);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    // const prismaUsersRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({
      name: username,
      email: emailFormatting,
      password_hash: await hash(password, 6),
    });

    return { user };
  }
}
