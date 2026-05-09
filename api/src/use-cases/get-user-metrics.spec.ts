import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InMemoryExpensesRepository } from '@/repositories/in-memory/in-memory-expenses-repository';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { GetUserMetricsUseCase } from './get-user-metrics';

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let expensesRepository: InMemoryExpensesRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    expensesRepository = new InMemoryExpensesRepository();
    sut = new GetUserMetricsUseCase(usersRepository, expensesRepository);
  });

  it('should be able to get expenses count from metrics', async () => {
    const userCreated = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const categoryCreated = await categoriesRepository.create({
      title: "Alimentação",
      description: "Categoria criada para fiscalizar as compras de alimentos",
      user: {
        connect: { id: userCreated.id }
      }
    });

    await expensesRepository.create({
      title: "Pães",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 10.60,
      card_last_digits: "2343",
      created_at: new Date(),
      user: {
        connect: {
          id: userCreated.id
        }
      },
      category: {
        connect: {
          id: categoryCreated.id
        }
      }
    });

    await expensesRepository.create({
      title: "Leite",
      enterprise: "Mercado Ceifa",
      description: "Café da manhã",
      cnpj: "123.242.324.23/24",
      source: "Embu das Artes / São Paulo",
      price: 5.60,
      card_last_digits: "2343",
      created_at: new Date(),
      user: {
        connect: {
          id: userCreated.id
        }
      },
      category: {
        connect: {
          id: categoryCreated.id
        }
      }
    });

    const { expensesCount } = await sut.execute({
      userId: userCreated.id
    });

    expect(expensesCount).toEqual(2);
  });
});
