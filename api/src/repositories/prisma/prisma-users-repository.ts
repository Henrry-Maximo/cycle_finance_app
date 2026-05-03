import { prisma } from '@/lib/prisma';
import { Prisma, User } from '../../../generated/prisma/client';
import { UsersRepository } from '../users-repository';

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
        email
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
    });

    return user;
  }

  allUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findByName(name?: string): Promise<User[] | null> {
    throw new Error('Method not implemented.');
  }

}

// new PrismaUsersRepository().create({  })