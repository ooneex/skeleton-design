import { useLayoutEffect } from "react";
import { cn } from "@/utils/cn";
import { useDialogContext } from "./DialogContext";

export const AlertDialogTitle = ({ className, id, ...props }: React.ComponentProps<"h2">) => {
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
      data-slot="alert-dialog-title"
      className={cn(
        "text-lg font-medium sm:group-data-[size=md]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className,
      )}
      {...props}
    />
  );
};
