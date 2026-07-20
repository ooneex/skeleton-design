import type * as React from "react";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";

export const AlertDialogAction = ({ className, ...props }: React.ComponentProps<typeof Button>) => {
  return <Button data-slot="alert-dialog-action" className={cn(className)} {...props} />;
};
AlertDialogAction.displayName = "AlertDialogAction";
