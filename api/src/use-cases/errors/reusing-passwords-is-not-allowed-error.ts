export class ReusingPasswordsIsNotAllowedError extends Error {
  constructor() {
    super("Reusing passwords is not allowed.");
  }
}
