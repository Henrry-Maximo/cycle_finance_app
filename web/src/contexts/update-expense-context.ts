import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

interface UpdateExpenseContextType {
  expense: {
    id: string;
    title?: string;
    enterprise?: string;
    description?: string | null;
    cnpj?: string | null;
    source?: string | null;
    price?: number;
    card_last_digits?: string;
  };
  isPending: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  // handleUpdateExpense: () => Promise<void>;
}

export const UpdateExpenseContext = createContext(
  {} as UpdateExpenseContextType,
);

// atalho para não precisar importar context/useContext
export function useUpdateExpense() {
  return useContext(UpdateExpenseContext);
}
