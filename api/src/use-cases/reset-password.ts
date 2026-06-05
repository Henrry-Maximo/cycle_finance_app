import { UsersRepository } from "@/repositories/users-repository";

interface PasswordUseCaseRequest {
  token: string;
  password: string;
}

interface PasswordUseCaseResponse {
  message: string;
}

export class ResetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    token,
    password,
  }: PasswordUseCaseRequest): Promise<PasswordUseCaseResponse> {
    return { message: "" };
  }
}
