import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import type * as React from "react";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";

type AlertDialogCancelPropsType = AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">;

export const AlertDialogCancel = ({
  className,
  variant = "outline",
  size = "sm",
  ...props
}: AlertDialogCancelPropsType) => {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
};
