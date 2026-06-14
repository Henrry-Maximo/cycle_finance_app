export class CategoryIsLinkedExpenseError extends Error {
  constructor() {
    super("Category is linked expense.");
  }
}
