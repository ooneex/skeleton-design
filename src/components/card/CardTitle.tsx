import type * as React from "react";
import { cn } from "@/utils/cn";

export const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={cn("p-0 text-sm leading-normal font-medium group-data-[size=sm]/card:text-sm", className)}
      {...props}
    />
  );
};

CardTitle.displayName = "Card.Title";
