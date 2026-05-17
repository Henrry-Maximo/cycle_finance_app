import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './pages/_layouts/app';
import { AuthLayout } from './pages/_layouts/auth';
import { NotFound } from './pages/404';
import { Error } from './pages/500';
import { Dashboard } from './pages/app/dashboard/dashboard';
import { Expenses } from './pages/app/expenses/expenses';
import { Scan } from './pages/app/scan/scan';
import { Settings } from './pages/app/settings';
import { Request } from './pages/auth/reset/request';
import { Update } from './pages/auth/reset/update';
import { SignIn } from './pages/auth/sign-in';
import { SignUp } from './pages/auth/sign-up';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
          },
          {
            path: '/expenses',
            element: <Expenses />,
          },
          {
            path: '/scan',
            element: <Scan />,
          },
          {
            path: '/settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/request',
        element: <Request />,
      },
      {
        path: '/update',
        element: <Update />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);
