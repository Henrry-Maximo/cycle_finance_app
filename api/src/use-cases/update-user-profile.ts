import { User } from "@/generated/prisma/client";
import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUserProfileUseCaseRequest {
  userId: string;
  username: string | null;
  email: string | null;
}

interface UpdateUserProfileUseCaseResponse {
  user: User;
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    username,
    email,
  }: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    await this.usersRepository.update(userId, {
      // ...(username && { username }),
      // ...(email && { email }),
      name: username ? username : user.name,
      email: email ? email : user.email,
    });

    return { user };
  }
}
