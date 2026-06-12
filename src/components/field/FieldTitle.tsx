import type * as React from "react";
import { cn } from "@/utils/cn";

/** Inline title for a field, styled like a label. */
export const FieldTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug",
        className,
      )}
      {...props}
    />
  );
};
