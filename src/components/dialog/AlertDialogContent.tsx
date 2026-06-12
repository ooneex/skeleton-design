import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "@/utils/cn";
import { AlertDialogOverlay } from "./AlertDialogOverlay";
import { AlertDialogPortal } from "./AlertDialogPortal";

type AlertDialogContentPropsType = AlertDialogPrimitive.Popup.Props & {
  size?: "md" | "sm";
};

export const AlertDialogContent = ({ className, size = "md", ...props }: AlertDialogContentPropsType) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 gap-6 rounded p-6 ring-1 duration-100 data-[size=md]:max-w-xs data-[size=sm]:max-w-xs data-[size=md]:sm:max-w-lg group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 outline-none",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
};
