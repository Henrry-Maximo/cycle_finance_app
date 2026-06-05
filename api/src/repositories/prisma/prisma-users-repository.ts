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
  
  async allUsers() {
    const users = await prisma.user.findMany();

    return users;
  }
  
  async findByName(name: string) {
    const users = await prisma.user.findMany({
      where: {
        name: { contains: name }
      },
    });
    
    return users;
  }
  
  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id
      },
    });

    return null;
  }
}

// new PrismaUsersRepository().create({  })