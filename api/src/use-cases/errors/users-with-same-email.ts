export class UsersWithSameEmail extends Error {
  constructor() {
    super("User already exists.");
  }
}