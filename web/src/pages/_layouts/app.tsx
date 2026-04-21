import { Footer } from "@/components/app-footer";
import { Header } from "@/components/app-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      {/* <AppSidebar /> */}

      <div className="flex flex-col min-h-screen w-full">
        <Header />

        <main className="flex flex-col">
          {/* <div className="flex items-center gap-2 mb-4">
            <SidebarTrigger />
          </div> */}

          <div className="flex-1">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </SidebarProvider>
  );
}
