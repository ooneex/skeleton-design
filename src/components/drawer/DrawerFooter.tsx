import type * as React from "react";
import { cn } from "@/utils/cn";

export const DrawerFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div data-slot="drawer-footer" className={cn("gap-2 p-4 mt-auto flex flex-col", className)} {...props} />;
};
DrawerFooter.displayName = "DrawerFooter";
