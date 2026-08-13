export class RequestPasswordFetchError extends Error {
  constructor() {
    super('Houve um problema com o servi?o de renova??o de senha.');
  }
}
