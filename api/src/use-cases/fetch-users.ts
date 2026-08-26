import { Role } from "@/generated/prisma/client";
import { UsersRepository } from "@/repositories/users-repository";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  terms_accepted_at: Date;
  terms_version: string;
}

interface GetUsersUseCaseRequest {
  userName?: string;
  pageIndex?: number;
  perPage?: number;
}

interface Pagination {
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

interface GetUsersUseCaseResponse {
  users: User[];
  meta: Pagination;
}

export class GetUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userName = "",
    pageIndex = 1,
    perPage = 15,
  }: GetUsersUseCaseRequest): Promise<GetUsersUseCaseResponse> {
    const usersArray = await this.usersRepository.findManyByName(
      userName,
      pageIndex,
      perPage,
    );

    const totalCount = usersArray.length;
    const totalPages = Math.ceil(totalCount / perPage);

    // gerar um novo array a partir do original, removendo a senha do usuário (hash)
    const users = usersArray.map(({ password_hash, ...users }) => users);

    return {
      users,
      meta: {
        page: pageIndex,
        perPage,
        totalCount,
        totalPages,
      },
    };
  }
}
