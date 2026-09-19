import { createContext, useContext } from 'react';

interface DeleteCategoryContextType {
  handleDeleteCategory: (id: string) => Promise<void>;
  isPending: boolean;
}

export const DeleteCategoryContext = createContext(
  {} as DeleteCategoryContextType,
);

// atalho para não precisar importar context/useContext
export function useDeleteCategory() {
  return useContext(DeleteCategoryContext);
}
