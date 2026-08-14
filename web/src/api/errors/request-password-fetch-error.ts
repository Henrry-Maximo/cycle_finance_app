export class RequestPasswordFetchError extends Error {
  constructor() {
    super('Houve um problema com o serviço de renovação de senha.');
  }
}
