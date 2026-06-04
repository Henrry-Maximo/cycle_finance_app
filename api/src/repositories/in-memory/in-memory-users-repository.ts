import { User } from "generated/prisma/client";
import { UserCreateInput } from "generated/prisma/models";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: UserCreateInput) {
    const user = {
      id: data.id ?? String(randomUUID()),
      name: data.name,
      email: data.email,
      role: data.role ?? 'MEMBER',
      password_hash: data.password_hash,
      terms_accepted_at: new Date(),
      terms_version: '1.0.0'
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }

  async findByName(name: string) {
    const user = this.items.find((item) => item.name === name);

    if (!user) return [];

    return [user];
  }

  async allUsers(): Promise<User[]> {
    const users = this.items;

    return users;
  }
}
