import { useLayoutEffect } from "react";
import { cn } from "@/utils/cn";
import { useDialogContext } from "./DialogContext";

export const DialogDescription = ({ className, id, ...props }: React.ComponentProps<"p">) => {
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
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
};
