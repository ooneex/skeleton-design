import { useLayoutEffect } from "react";
import { useDialogContext } from "@/components/dialog/DialogContext";
import { cn } from "@/utils/cn";

export const PopoverDescription = ({ className, id, ...props }: React.ComponentProps<"p">) => {
  const context = useDialogContext();
  const setHasDescription = context?.setHasDescription;
  useLayoutEffect(() => {
    if (!setHasDescription) return;
    setHasDescription(true);
    return () => setHasDescription(false);
  }, [setHasDescription]);
  return (
    <p
      id={id ?? context?.descriptionId}
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
};
