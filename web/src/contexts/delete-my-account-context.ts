import { createContext, useContext } from 'react';

interface DeleteMyAccountContextType {
  handleDeleteMyAccount: () => Promise<void>;
  isPending: boolean;
}

export const DeleteMyAccountContext = createContext(
  {} as DeleteMyAccountContextType,
);

// atalho para não precisar importar context/useContext
export function useDeleteMyAccount() {
  return useContext(DeleteMyAccountContext);
}
