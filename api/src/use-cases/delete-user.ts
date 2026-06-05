import { UsersRepository } from "@/repositories/users-repository";

import { NotAuthorizedError } from "./errors/not-authorized-error";

interface DeleteUserUseCaseRequest {
  id: string;
  userId: string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, userId }: DeleteUserUseCaseRequest): Promise<null> {
    const user = await this.usersRepository.findById(id);

    if (user?.id != userId) {
      throw new NotAuthorizedError();
    }

    await this.usersRepository.delete(id);

    return null;
  }
}
