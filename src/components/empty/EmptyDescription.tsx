import type * as React from "react";
import { cn } from "@/utils/cn";

export const EmptyDescription = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-sm text-muted-foreground [&>a:hover]:text-foreground [&>a]:underline [&>a]:underline-offset-4",
        className,
      )}
      {...props}
    />
  );
};

EmptyDescription.displayName = "Empty.Description";
