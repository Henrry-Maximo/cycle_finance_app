import { createContext, useContext } from 'react';

interface DeleteExpenseContextType {
  handleDeleteExpense: () => Promise<void>;
}

export const DeleteExpenseContext = createContext(
  {} as DeleteExpenseContextType,
);

// atalho para não precisar importar context/useContext
export function useDeleteExpense() {
  return useContext(DeleteExpenseContext);
}
