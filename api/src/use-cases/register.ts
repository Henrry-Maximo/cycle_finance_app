import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";

interface RegisterUseCaseRequest {
  username: string;
  email: string;
  password: string;
};

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { };

  async execute({ username, email, password }: RegisterUseCaseRequest) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    };

    // const prismaUsersRepository = new PrismaUsersRepository();

    await this.usersRepository.create({ name: username, email, password_hash: await hash(password, 6) })
  };
};

