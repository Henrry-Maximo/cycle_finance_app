import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { UsersWithSameEmail } from "./errors/users-with-same-email";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({ name, email, password }: RegisterUseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    },
  });

  if (userWithSameEmail) {
    throw new UsersWithSameEmail();
  };

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: await hash(password, 6)
    },
  });
}