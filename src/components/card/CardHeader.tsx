import type * as React from "react";
import { cn } from "@/utils/cn";

export const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "gap-1 p-0 [.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        className,
      )}
      {...props}
    />
  );
};

CardHeader.displayName = "Card.Header";
