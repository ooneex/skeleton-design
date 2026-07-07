import { useLayoutEffect } from "react";
import { useDialogContext } from "@/components/dialog/DialogContext";
import { cn } from "@/utils/cn";

export const PopoverTitle = ({ className, id, ...props }: React.ComponentProps<"h2">) => {
  const context = useDialogContext();
  const setHasTitle = context?.setHasTitle;
  useLayoutEffect(() => {
    if (!setHasTitle) return;
    setHasTitle(true);
    return () => setHasTitle(false);
  }, [setHasTitle]);
  return (
    <h2 id={id ?? context?.titleId} data-slot="popover-title" className={cn("font-medium", className)} {...props} />
  );
};
