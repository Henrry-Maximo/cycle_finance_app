import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InMemoryExpensesRepository } from '@/repositories/in-memory/in-memory-expenses-repository';
import { GetExpensesUseCase } from './get-expenses';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';

let usersRepository: InMemoryUsersRepository;
let categoriesRepository: InMemoryCategoriesRepository;
let expensesRepository: InMemoryExpensesRepository;
let sut: GetExpensesUseCase;

describe('Get Expenses Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    categoriesRepository = new InMemoryCategoriesRepository();
    expensesRepository = new InMemoryExpensesRepository();
    sut = new GetExpensesUseCase(expensesRepository);
  });

  it('should be able to get expenses list', async () => {
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

    const { expenses } = await sut.execute();

    expect(expenses).toHaveLength(2);
  });

});
