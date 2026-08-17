import { createContext } from 'react';

interface AuthenticateContextType {
  token: string | null;
  addCurrentTokenSession: (token: string) => void;
}

export const AuthenticationContext = createContext(
  {} as AuthenticateContextType,
);

/*
  - ponte entre o axios e o contexto React
  - permite que o axios atualize o token no estado do React após um refresh silencioso
 */
export const tokenBridge = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setToken: (_token: string) => {},
};
