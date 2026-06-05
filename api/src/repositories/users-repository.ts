import { Prisma, User } from "@/generated/prisma/client";

export interface UsersRepository {
  findMany(): Promise<User[]>;
  findByName(query: string): Promise<User[]>
  findById(id: string): Promise<User | null>;
  findByEmail(data: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  delete(id: string): Promise<null>;
}
