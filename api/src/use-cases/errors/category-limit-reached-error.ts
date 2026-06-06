export class CategoryLimitReachedError extends Error {
  constructor() {
    super("Category limit reached.");
  }
}
