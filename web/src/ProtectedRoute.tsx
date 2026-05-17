import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('cycle_finance_api');

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // Se estiver logado, renderiza as rotas filhas
  return <Outlet />;
}
