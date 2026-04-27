import { prisma } from "@/lib/prisma";
import { UsersWithSameEmail } from "./errors/users-with-same-email";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  username: string;
  email: string;
  password: string;
};

export class RegisterUseCase {
  constructor(private usersRepository: any) { };

  async execute({ username, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email
      },
    });

    if (userWithSameEmail) {
      throw new UsersWithSameEmail();
    };

    // const prismaUsersRepository = new PrismaUsersRepository();

    await this.usersRepository.create({ name: username, email, password_hash: await hash(password, 6) })
  };
};

