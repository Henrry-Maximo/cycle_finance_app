import { CircleNotchIcon } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { refreshTokenSession } from './api/refresh-token-session';
import { AuthenticationContext } from './contexts/authentication-context';

export function ProtectedRoute() {
  const { token, addCurrentTokenSession } = useContext(AuthenticationContext);
  // const token = localStorage.getItem('cycle_finance_api');

  const { isLoading, data } = useQuery({
    queryKey: ['refresh-token'],
    queryFn: refreshTokenSession,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data?.token) addCurrentTokenSession(data.token);
  }, [data?.token, addCurrentTokenSession]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircleNotchIcon className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!token && !data?.token) {
    return <Navigate to="/sign-in" replace />;
  }

  // Se estiver logado, renderiza as rotas filhas
  return <Outlet />;
}
