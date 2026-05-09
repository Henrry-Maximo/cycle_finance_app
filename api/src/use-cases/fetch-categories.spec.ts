import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { FetchCategoriesUseCase } from './fetch-categories';

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let sut: FetchCategoriesUseCase;

describe('Get User Categories History Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new FetchCategoriesUseCase(usersRepository, categoriesRepository);
  });

  it('should be able to fetch user categories history', async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    await categoriesRepository.create({
      title: "Alimentação",
      description: "Categoria criada para fiscalizar as compras de alimentos",
      user: {
        connect: { id: userCreated.id }
      }
    });

    await categoriesRepository.create({
      title: "Entretenimento",
      description: "Categoria criada para fiscalizar as compras em relação a entretenimento",
      user: {
        connect: { id: userCreated.id }
      }
    });

    const { categories } = await sut.execute({
      userId: userCreated.id
    });

    expect(categories).toHaveLength(2);
    expect(categories).toEqual([
      expect.objectContaining({ title: "Alimentação" }),
      expect.objectContaining({ title: "Entretenimento" }),
    ]);
  });

});
