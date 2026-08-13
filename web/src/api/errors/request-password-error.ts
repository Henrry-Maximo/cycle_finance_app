export class RequestPasswordError extends Error {
  constructor() {
    super('Não foi possível realizar a renovação de senha.');
  }
}
