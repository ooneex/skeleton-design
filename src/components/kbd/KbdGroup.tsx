import type * as React from "react";
import { cn } from "@/utils/cn";

export const KbdGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <kbd data-slot="kbd-group" className={cn("gap-1 inline-flex items-center", className)} {...props} />
);
