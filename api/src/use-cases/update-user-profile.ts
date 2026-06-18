import { UsersRepository } from "@/repositories/users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface UpdateUserProfileUseCaseRequest {
  userId: string;
  name?: string;
  email?: string;
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
  }: UpdateUserProfileUseCaseRequest): Promise<null> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    await this.usersRepository.update(userId, {
      ...(name && { name }),
      ...(email && { email }),
    });

    return null;
  }
}
