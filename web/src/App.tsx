import './globals.css';

import { router } from './routes';
import { RouterProvider } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Cycle Finance" />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
