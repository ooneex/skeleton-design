import type * as React from "react";
import { cn } from "@/utils/cn";

export const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div data-slot="card-content" className={cn("p-0", className)} {...props} />;
};
