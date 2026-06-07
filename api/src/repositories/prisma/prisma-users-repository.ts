import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

import { UsersRepository } from "../users-repository";
import { UserUpdateInput } from "@/generated/prisma/models";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findMany() {
    const users = await prisma.user.findMany();

    return users;
  }

  async findByName(name: string) {
    const users = await prisma.user.findMany({
      where: {
        name: { contains: name },
      },
    });

    return users;
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    return null;
  }

  async update(id: string, data: UserUpdateInput) {
    await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return null;
  }
}

// new PrismaUsersRepository().create({  })
