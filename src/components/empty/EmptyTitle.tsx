import type * as React from "react";
import { cn } from "@/utils/cn";

export const EmptyTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div data-slot="empty-title" className={cn("text-sm font-medium tracking-tight", className)} {...props} />;
};
