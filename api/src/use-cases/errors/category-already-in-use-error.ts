export class CategoryAlreadyInUseError extends Error {
  constructor() {
    super("Category already in use.");
  }
}
