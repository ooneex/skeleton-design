import type * as React from "react";
import { cn } from "@/utils/cn";

export const CardFooter = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div data-slot="card-footer" className={cn("px-4 [.border-t]:pt-4 flex items-center", className)} {...props} />
  );
};
