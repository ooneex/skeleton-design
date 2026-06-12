import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { DialogClose } from "./DialogClose";
import { DialogContent } from "./DialogContent";
import { DialogDescription } from "./DialogDescription";
import { DialogFooter } from "./DialogFooter";
import { DialogHeader } from "./DialogHeader";
import { DialogOverlay } from "./DialogOverlay";
import { DialogPortal } from "./DialogPortal";
import { DialogTitle } from "./DialogTitle";
import { DialogTrigger } from "./DialogTrigger";

const DialogRoot = (props: DialogPrimitive.Root.Props) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
};

/**
 * Dialog compound component.
 *
 * Use the attached sub-components (`Dialog.Trigger`, `Dialog.Content`,
 * `Dialog.Header`, etc.) to compose a dialog.
 */
export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Close: DialogClose,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});
