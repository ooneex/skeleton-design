import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type React from "react";
import { cn } from "@/utils/cn";

type SidebarGroupActionPropsType = useRender.ComponentProps<"button"> & React.ComponentProps<"button">;

export const SidebarGroupAction = ({ className, render, ...props }: SidebarGroupActionPropsType) => {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      {
        className: cn(
          "text-primary ring-ring hover:bg-muted hover:text-primary absolute top-3.5 right-3 w-5 rounded p-0 focus-visible:ring-2 [&>svg]:size-4 flex aspect-square items-center justify-center outline-hidden transition-transform [&>svg]:shrink-0 after:absolute after:-inset-2 md:after:hidden group-data-[collapsible=icon]:hidden",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "sidebar-group-action",
      sidebar: "group-action",
    },
  });
};
