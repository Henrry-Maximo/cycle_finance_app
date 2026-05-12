import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { FetchCategoriesUseCase } from './fetch-categories';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let sut: FetchCategoriesUseCase;

describe('Get User Categories History Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new FetchCategoriesUseCase(usersRepository, categoriesRepository);
  });

  it('should be able to fetch categories history', async () => {
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
      userId: userCreated.id,
      page: 1
    });

    expect(categories).toHaveLength(2);
    expect(categories).toEqual([
      expect.objectContaining({ title: "Alimentação" }),
      expect.objectContaining({ title: "Entretenimento" }),
    ]);
  });

  it('should be able to fetch paginated categories history', async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    for (let i = 1; i <= 22; i++) {
      await categoriesRepository.create({
        id: `category-${i}`,
        title: "Alimentação",
        description: "Categoria criada para fiscalizar as compras de alimentos",
        user: {
          connect: { id: userCreated.id }
        }
      });
    };

    const { categories } = await sut.execute({
      userId: userCreated.id,
      page: 2
    });

    expect(categories).toHaveLength(2);
    expect(categories).toEqual([
      expect.objectContaining({ id: "category-21" }),
      expect.objectContaining({ id: "category-22" }),
    ]);
  });

  it('should not be able to fetch categories history if user is not exists.', async () => {
    await expect(() => sut.execute({
      userId: 'non-existing-id',
      page: 1,
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
