import './globals.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { ThemeProvider } from './components/theme/theme-provider';
import { router } from './routes';

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="cycle-finance-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Cycle Finance" />
        <Toaster richColors closeButton />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
