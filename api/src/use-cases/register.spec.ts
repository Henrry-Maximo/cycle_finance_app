import { expect, test, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { compare } from 'bcryptjs';
import { id } from 'zod/v4/locales';

// Test Unit
describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    // const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase({
      async findByEmail(data) {
        return null;
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          terms_accepted_at: new Date(),
          terms_version: '1.0.0'
        }
      },
    });

    const { user } = await registerUseCase.execute({
      username: 'Henrry',
      email: 'Henrrylimadasilva@gmail.com',
      password: '123456'
    });

    console.log(user.password_hash);
    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});


// test('check if it works', () => {
//   expect(2 + 2).toBe(4);
// });