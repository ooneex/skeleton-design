import type React from "react";
import { cn } from "@/utils/cn";

type SidebarMenuPropsType = React.ComponentProps<"ul">;

export const SidebarMenu = ({ className, ...props }: SidebarMenuPropsType) => {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("gap-1 flex w-full min-w-0 flex-col", className)}
      {...props}
    />
  );
};
