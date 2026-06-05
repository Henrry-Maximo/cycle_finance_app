export class NotAuthorizedError extends Error {
  constructor() {
    super("You are not authorized.");
  }
}
