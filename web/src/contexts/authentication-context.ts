import { createContext } from 'react';

interface AuthenticateContextType {
  token: string | null;
  addCurrentTokenSession: (token: string) => void;
}

export const AuthenticationContext = createContext(
  {} as AuthenticateContextType,
);
