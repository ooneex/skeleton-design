import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

export const ContextMenuTrigger = (props: ContextMenuPrimitive.Trigger.Props) => {
  return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />;
};
