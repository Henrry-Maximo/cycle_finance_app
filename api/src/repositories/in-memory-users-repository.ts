
export class InMemoryUsersRepository {
  public users: any = [];

  async create(data: any) {
    this.users.push(data);
  }
}
