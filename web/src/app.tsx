import './globals.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { ThemeProvider } from './components/theme/theme-provider';
import {
  AuthenticationContext,
  tokenBridge,
} from './contexts/authentication-context';
import { queryClient } from './lib/react-query';
import { router } from './routes';

export function App() {
  const [tokenSession, setTokenSession] = useState<string | null>(null);

  const addCurrentTokenSession = useCallback((token: string) => {
    setTokenSession(token);
  }, []);

  // conecta o addCurrentTokenSession ao tokenBridge para que o axios
  // consiga atualizar o token no contexto React após um refresh
  useEffect(() => {
    tokenBridge.setToken = addCurrentTokenSession;
  }, [addCurrentTokenSession]);

  return (
    <HelmetProvider>
      <ThemeProvider storageKey="cycle-finance-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Cycle Finance" />
        <Toaster richColors closeButton />

        <QueryClientProvider client={queryClient}>
          <AuthenticationContext.Provider
            value={{ token: tokenSession, addCurrentTokenSession }}
          >
            <RouterProvider router={router} />
          </AuthenticationContext.Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
