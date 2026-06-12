import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type React from "react";
import { cn } from "@/utils/cn";

type SidebarMenuSubButtonPropsType = useRender.ComponentProps<"a"> &
  React.ComponentProps<"a"> & {
    size?: "sm" | "md";
    isActive?: boolean;
  };

export const SidebarMenuSubButton = ({
  render,
  size = "md",
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonPropsType) => {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          "text-primary ring-ring hover:bg-muted hover:text-primary active:bg-muted active:text-primary data-active:bg-muted data-active:text-primary h-7 gap-2 rounded px-2 focus-visible:ring-2 text-sm [&>svg]:size-4 flex min-w-0 -translate-x-px items-center overflow-hidden outline-hidden group-data-[collapsible=icon]:hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:shrink-0",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  });
};
