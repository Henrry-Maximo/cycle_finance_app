export class ResetPasswordTokenUsed extends Error {
  constructor() {
    super("Token used.");
  }
}
