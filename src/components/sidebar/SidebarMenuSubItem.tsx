import type React from "react";
import { cn } from "@/utils/cn";

type SidebarMenuSubItemPropsType = React.ComponentProps<"li">;

export const SidebarMenuSubItem = ({ className, ...props }: SidebarMenuSubItemPropsType) => {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  );
};
