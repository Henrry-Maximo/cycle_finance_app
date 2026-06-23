import { Prisma, User } from "@/generated/prisma/client";

export interface UsersRepository {
  findManyByName(
    userName: string,
    pageIndex: number,
    perPage: number,
  ): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(data: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(id: string, data: Prisma.UserUpdateInput): Promise<null>;
  delete(id: string): Promise<null>;
}
