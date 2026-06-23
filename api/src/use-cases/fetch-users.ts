import { User } from "@/generated/prisma/client";
import { UsersRepository } from "@/repositories/users-repository";

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
    const users = await this.usersRepository.findManyByName(
      userName,
      pageIndex,
      perPage,
    );

    const totalCount = users.length;
    const totalPages = Math.ceil(totalCount / perPage);

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
