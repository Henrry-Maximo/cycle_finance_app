import { User } from "@/generated/prisma/client";
import { UsersRepository } from "@/repositories/users-repository";

interface GetUsersUseCaseRequest {
  query?: string | null,
}

interface GetUsersUseCaseResponse {
  users: User[];
}

export class GetUsersUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async execute({ query }: GetUsersUseCaseRequest): Promise<GetUsersUseCaseResponse> {
    const users = query
      ? await this.usersRepository.findByName(query)
      : await this.usersRepository.findMany();

    return { users };
  }
}