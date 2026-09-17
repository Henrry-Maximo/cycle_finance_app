import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/app-footer';
import { Header } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';

export function AppContent() {
  const { open, setOpen } = useSidebar();

  return (
    <div className="flex min-h-screen flex-col antialiased">
      {open && (
        <div
          className="fixed inset-0 z-9 bg-black/10 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex flex-row">
        <AppSidebar />
        <Header />
      </div>

      <main className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export function AppLayout() {
  return (
    <SidebarProvider className="flex flex-col" defaultOpen={false}>
      <AppContent />
    </SidebarProvider>
  );
}
