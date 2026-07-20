import type * as React from "react";
import { cn } from "@/utils/cn";

export const DialogHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div data-slot="dialog-header" className={cn("gap-2 flex flex-col", className)} {...props} />;
};
DialogHeader.displayName = "DialogHeader";
