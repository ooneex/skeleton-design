import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XmarkIcon } from "@/icons/outline/ui-layout/sm/XmarkIcon";
import { cn } from "@/utils/cn";
import { DialogOverlay } from "./DialogOverlay";
import { DialogPortal } from "./DialogPortal";

type DialogContentPropsType = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
};

export const DialogContent = ({ className, children, showCloseButton = false, ...props }: DialogContentPropsType) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "bg-white border data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 grid w-full gap-6 rounded p-4 text-sm duration-100 max-w-2xl fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-none border-none shadow-none",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute -top-3 -right-3 z-10 flex size-8 items-center justify-center rounded-full bg-card shadow-none border-none ring-[0.2px] ring-ring cursor-pointer transition-opacity hover:opacity-70"
          >
            <XmarkIcon className="text-foreground" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
};
