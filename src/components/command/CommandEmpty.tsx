import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

/** Placeholder shown when no command matches the current search. */
export const CommandEmpty = ({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) => {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-8 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};
CommandEmpty.displayName = "Command.Empty";
