import type * as React from "react";
import { cn } from "@/utils/cn";
import { ContextMenuContent } from "./ContextMenuContent";

type ContextMenuSubContentPropsType = React.ComponentProps<typeof ContextMenuContent>;

export const ContextMenuSubContent = ({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: ContextMenuSubContentPropsType) => {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={cn(
        "bg-dropdown text-dropdown-foreground min-w-40 rounded p-1 ring-[0.4px] ring-ring-active border-none overflow-x-hidden overflow-y-auto outline-none shadow-none",
        className,
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
};
