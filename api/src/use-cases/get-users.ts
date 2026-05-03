import { UsersRepository } from "@/repositories/users-repository";
import { User } from "generated/prisma/client";

interface GetUsersUseCaseRequest {
  name?: string,
}

interface GetUsersUseCaseResponse {
  users: User[]
}

export class GetUsersUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async execute({ name }: GetUsersUseCaseRequest): Promise<GetUsersUseCaseResponse> {
    const users = name
      ? await this.usersRepository.findByName(name)
      : await this.usersRepository.allUsers();

    return { users };
  }
}