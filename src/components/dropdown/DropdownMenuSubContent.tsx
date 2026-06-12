import type * as React from "react";
import { cn } from "@/utils/cn";
import { DropdownMenuContent } from "./DropdownMenuContent";

type DropdownMenuSubContentPropsType = React.ComponentProps<typeof DropdownMenuContent>;

export const DropdownMenuSubContent = ({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: DropdownMenuSubContentPropsType) => {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground min-w-24 rounded p-1 w-auto shadow-md shadow-black/20",
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
