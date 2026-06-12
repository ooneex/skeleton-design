import type React from "react";
import { cn } from "@/utils/cn";

type SidebarHeaderPropsType = React.ComponentProps<"div">;

export const SidebarHeader = ({ className, ...props }: SidebarHeaderPropsType) => {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("gap-2 p-2 flex flex-col", className)}
      {...props}
    />
  );
};
