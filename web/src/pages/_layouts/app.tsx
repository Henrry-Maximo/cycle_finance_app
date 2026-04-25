import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/app-footer';
import { Header } from '@/components/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <SidebarProvider>
        <div className="flex-1">
          <Outlet />
        </div>
      </SidebarProvider>

      <Footer />
    </div>
  );
}
