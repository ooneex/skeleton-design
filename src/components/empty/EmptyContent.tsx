import type * as React from "react";
import { cn } from "@/utils/cn";

export const EmptyContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="empty-content"
      className={cn("gap-4 text-sm flex w-full max-w-sm min-w-0 flex-col items-center text-balance", className)}
      {...props}
    />
  );
};

EmptyContent.displayName = "Empty.Content";
