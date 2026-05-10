import { Prisma, User } from "generated/prisma/client";

export interface UsersRepository {
  allUsers(): Promise<User[]>;
  findByName(query: string): Promise<User[]>
  findById(id: string): Promise<User | null>;
  findByEmail(data: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
