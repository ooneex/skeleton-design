import { DrawerClose } from "./DrawerClose";
import { DrawerContent } from "./DrawerContent";
import { DrawerDescription } from "./DrawerDescription";
import { DrawerFooter } from "./DrawerFooter";
import { DrawerHeader } from "./DrawerHeader";
import { DrawerOverlay } from "./DrawerOverlay";
import { DrawerPortal } from "./DrawerPortal";
import { DrawerRoot } from "./DrawerRoot";
import { DrawerTitle } from "./DrawerTitle";
import { DrawerTrigger } from "./DrawerTrigger";

/**
 * Drawer compound component built on top of `vaul`.
 *
 * Exposes the root drawer along with its sub-components as static members:
 * `Trigger`, `Portal`, `Close`, `Overlay`, `Content`, `Header`, `Footer`,
 * `Title` and `Description`.
 */
export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Close: DrawerClose,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Description: DrawerDescription,
});
