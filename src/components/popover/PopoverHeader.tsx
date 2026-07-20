import type * as React from "react";
import { cn } from "@/utils/cn";

export const PopoverHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div data-slot="popover-header" className={cn("flex flex-col gap-1 text-sm", className)} {...props} />;
};

PopoverHeader.displayName = "Popover.Header";
