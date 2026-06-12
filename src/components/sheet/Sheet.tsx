import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { SheetClose } from "./SheetClose";
import { SheetContent } from "./SheetContent";
import { SheetDescription } from "./SheetDescription";
import { SheetFooter } from "./SheetFooter";
import { SheetHeader } from "./SheetHeader";
import { SheetOverlay } from "./SheetOverlay";
import { SheetPortal } from "./SheetPortal";
import { SheetTitle } from "./SheetTitle";
import { SheetTrigger } from "./SheetTrigger";

const SheetRoot = (props: SheetPrimitive.Root.Props) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
};

/**
 * Sheet compound component built on base-ui Dialog. Renders a side panel
 * (top/right/bottom/left) with overlay, header, footer, title and description.
 */
export const Sheet = Object.assign(SheetRoot, {
  Trigger: SheetTrigger,
  Close: SheetClose,
  Portal: SheetPortal,
  Overlay: SheetOverlay,
  Content: SheetContent,
  Header: SheetHeader,
  Footer: SheetFooter,
  Title: SheetTitle,
  Description: SheetDescription,
});
