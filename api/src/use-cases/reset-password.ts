import { UsersRepository } from "@/repositories/users-repository";

interface PasswordUseCaseRequest {
  token: string;
  password: string;
}

interface PasswordUseCaseResponse {
  message: string;
}

export class RequestResetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    token,
    password,
  }: PasswordUseCaseRequest): Promise<PasswordUseCaseResponse> {
    return { message: "" };
  }
}
