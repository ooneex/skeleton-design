import type * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

export const DrawerPortal = (props: React.ComponentProps<typeof DrawerPrimitive.Portal>) => {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
};
