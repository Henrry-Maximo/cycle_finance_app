import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/app-footer';
import { Header } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export function AppLayout() {
  return (
    <SidebarProvider className="flex flex-col" defaultOpen={false}>
      <div className="flex min-h-screen flex-col antialiased">
        <div className="flex flex-row">
          <AppSidebar />
          <Header />
        </div>

        <main className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </SidebarProvider>
  );
}
