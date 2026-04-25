import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './pages/_layouts/app';
import { AuthLayout } from './pages/_layouts/auth';
import { Dashboard } from './pages/app/dashboard';
import { Scan } from './pages/app/scan';
import { Request } from './pages/auth/reset/request';
import { Update } from './pages/auth/reset/update';
import { SignIn } from './pages/auth/sign-in';
import { SignUp } from './pages/auth/sign-up';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/scan',
        element: <Scan />,
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
]);
