import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthenticationContext } from './contexts/authentication-context';

export function ProtectedRoute() {
  const { token } = useContext(AuthenticationContext);
  // const token = localStorage.getItem('cycle_finance_api');

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // Se estiver logado, renderiza as rotas filhas
  return <Outlet />;
}
