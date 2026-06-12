import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Toaster } from "@/components/Toaster";

export const AppLayout = () => {
  return (
    <Sidebar.Provider>
      <AppSidebar />
      <Sidebar.Inset>
        <main className="flex-1 min-h-0 overflow-y-auto p-0">
          <Outlet />
        </main>
      </Sidebar.Inset>
      <Toaster />
    </Sidebar.Provider>
  );
};
