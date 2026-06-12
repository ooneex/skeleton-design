import type * as React from "react";
import { cn } from "@/utils/cn";

export const ContextMenuShortcut = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
};
