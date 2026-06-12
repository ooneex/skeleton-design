import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

/** Thin divider between command groups. */
export const CommandSeparator = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>) => {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border/50 mx-2 h-px w-auto", className)}
      {...props}
    />
  );
};
