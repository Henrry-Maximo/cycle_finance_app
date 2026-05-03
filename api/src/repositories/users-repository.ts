import { Prisma, User } from "generated/prisma/client";

export interface UsersRepository {
  allUsers(): Promise<User[]>;
  findByName(name?: string): Promise<User[] | null>
  findById(id: string): Promise<User | null>;
  findByEmail(data: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
