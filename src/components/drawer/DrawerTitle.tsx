import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/utils/cn";

export const DrawerTitle = ({ className, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title>) => {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
};
