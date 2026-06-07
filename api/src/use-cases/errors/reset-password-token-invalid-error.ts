export class ResetPasswordTokenInvalid extends Error {
  constructor() {
    super("Token invalid.");
  }
}
