import { AppSidebarFooter } from "./AppSidebarFooter";
import { AppSidebarHeader } from "./AppSidebarHeader";
import { AppSidebarNav } from "./AppSidebarNav";
import { Sidebar } from "./Sidebar";
import { useSidebar } from "./useSidebar";

export const AppSidebar = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader isExpanded={isExpanded} />
      <Sidebar.Content className="flex flex-col justify-between pb-8 pt-4">
        <AppSidebarNav />
      </Sidebar.Content>
      <AppSidebarFooter isExpanded={isExpanded} />
      <Sidebar.Rail />
    </Sidebar>
  );
};
