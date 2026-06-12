import type * as React from "react";
import { cn } from "@/utils/cn";

export const EmptyHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div data-slot="empty-header" className={cn("gap-2 flex max-w-sm flex-col items-center", className)} {...props} />
  );
};
