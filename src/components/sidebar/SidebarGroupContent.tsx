import type React from "react";
import { cn } from "@/utils/cn";

type SidebarGroupContentPropsType = React.ComponentProps<"div">;

export const SidebarGroupContent = ({ className, ...props }: SidebarGroupContentPropsType) => {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("text-sm w-full", className)}
      {...props}
    />
  );
};
