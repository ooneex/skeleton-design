import type React from "react";
import { cn } from "@/utils/cn";

type SidebarFooterPropsType = React.ComponentProps<"div">;

export const SidebarFooter = ({ className, ...props }: SidebarFooterPropsType) => {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("gap-2 p-2 flex flex-col", className)}
      {...props}
    />
  );
};
SidebarFooter.displayName = "Sidebar.Footer";
