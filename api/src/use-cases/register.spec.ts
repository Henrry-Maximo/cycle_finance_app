import { expect, describe, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

// Test Unit
describe('Register Use Case', () => {
  it('should be able to register', async () => {
    // const prismaUsersRepository = new PrismaUsersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      username: 'Henrry',
      email: 'Henrrylimadasilva@gmail.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    // const prismaUsersRepository = new PrismaUsersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      username: 'Henrry',
      email: 'Henrrylimadasilva@gmail.com',
      password: '123456'
    });

    console.log(user.password_hash);
    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    // const prismaUsersRepository = new PrismaUsersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "johndoe@example.com";

    await registerUseCase.execute({
      username: 'johndoe',
      email,
      password: '123456'
    });

    expect(() => registerUseCase.execute({
      username: 'johndoe',
      email,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});


// test('check if it works', () => {
//   expect(2 + 2).toBe(4);
// });