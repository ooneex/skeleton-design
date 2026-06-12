import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type * as React from "react";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";

type DialogFooterPropsType = React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
};

export const DialogFooter = ({ className, showCloseButton = false, children, ...props }: DialogFooterPropsType) => {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("gap-2 flex flex-col-reverse sm:flex-row sm:justify-end", className)}
      {...props}
    >
      {children}
      {showCloseButton && <DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>}
    </div>
  );
};
