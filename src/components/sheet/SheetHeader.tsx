import type * as React from "react";
import { cn } from "@/utils/cn";

export const SheetHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div data-slot="sheet-header" className={cn("gap-1.5 p-4 flex flex-col", className)} {...props} />;
};
