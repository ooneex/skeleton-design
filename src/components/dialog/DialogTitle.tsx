import { useLayoutEffect } from "react";
import { cn } from "@/utils/cn";
import { useDialogContext } from "./DialogContext";

export const DialogTitle = ({ className, id, ...props }: React.ComponentProps<"h2">) => {
  const context = useDialogContext();
  const setHasTitle = context?.setHasTitle;
  useLayoutEffect(() => {
    if (!setHasTitle) return;
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);
  return (
    <h2
      id={id ?? context?.titleId}
      data-slot="dialog-title"
      className={cn("leading-none font-medium", className)}
      {...props}
    />
  );
};
