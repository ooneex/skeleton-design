import type * as React from "react";
import { cn } from "@/utils/cn";

/** Wraps a field's primary content and stacks it vertically. */
export const FieldContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="field-content"
      className={cn("gap-1 group/field-content flex flex-1 flex-col leading-snug", className)}
      {...props}
    />
  );
};

FieldContent.displayName = "Field.Content";
