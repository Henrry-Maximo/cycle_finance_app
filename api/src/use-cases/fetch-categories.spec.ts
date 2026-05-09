import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { GetCategoriesUseCase } from './fetch-categories';

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let sut: GetCategoriesUseCase;

describe('Get Expenses Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    sut = new GetCategoriesUseCase(categoriesRepository);
  });

  it('should be able to get categories list', async () => {
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

    const { categories } = await sut.execute();

    expect(categories).toHaveLength(2);
    expect(categories).toEqual([
      expect.objectContaining({ title: "Alimentação" }),
      expect.objectContaining({ title: "Entretenimento" }),
    ]);
  });

});
