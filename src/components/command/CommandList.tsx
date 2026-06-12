import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

/** Scrollable container for command groups and items. */
export const CommandList = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) => {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto px-2", className)}
      {...props}
    />
  );
};
