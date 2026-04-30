import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";
import { type User } from "generated/prisma/client";

interface RegisterUseCaseRequest {
  username: string;
  email: string;
  password: string;
};

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { };

  async execute({ username, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    };

    // const prismaUsersRepository = new PrismaUsersRepository();

    const user = await this.usersRepository.create({ name: username, email, password_hash: await hash(password, 6) });

    return { user };
  };
};

