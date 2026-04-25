import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/app-footer';
import { Header } from '@/components/app-header';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
