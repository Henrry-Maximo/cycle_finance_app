import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthenticationContext } from '@/contexts/authentication-context';

export function RootLayout() {
  const [tokenSession, setTokenSession] = useState<string | null>(null);
  console.log('RootLayout token:', tokenSession);

  function addCurrentTokenSession(token: string) {
    setTokenSession(token);
  }

  return (
    <AuthenticationContext.Provider
      value={{ token: tokenSession, addCurrentTokenSession }}
    >
      <Outlet />
    </AuthenticationContext.Provider>
  );
}
