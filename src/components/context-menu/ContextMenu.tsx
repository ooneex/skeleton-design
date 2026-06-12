import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { ContextMenuCheckboxItem } from "./ContextMenuCheckboxItem";
import { ContextMenuContent } from "./ContextMenuContent";
import { ContextMenuGroup } from "./ContextMenuGroup";
import { ContextMenuItem } from "./ContextMenuItem";
import { ContextMenuLabel } from "./ContextMenuLabel";
import { ContextMenuPortal } from "./ContextMenuPortal";
import { ContextMenuRadioGroup } from "./ContextMenuRadioGroup";
import { ContextMenuRadioItem } from "./ContextMenuRadioItem";
import { ContextMenuSeparator } from "./ContextMenuSeparator";
import { ContextMenuShortcut } from "./ContextMenuShortcut";
import { ContextMenuSub } from "./ContextMenuSub";
import { ContextMenuSubContent } from "./ContextMenuSubContent";
import { ContextMenuSubTrigger } from "./ContextMenuSubTrigger";
import { ContextMenuTrigger } from "./ContextMenuTrigger";

const ContextMenuRoot = (props: ContextMenuPrimitive.Root.Props) => {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
};

/**
 * Context menu built with the compound component pattern.
 *
 * Access sub-components as static properties, e.g.
 * `ContextMenu.Trigger`, `ContextMenu.Content`, `ContextMenu.Item`.
 */
export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Group: ContextMenuGroup,
  Portal: ContextMenuPortal,
  RadioGroup: ContextMenuRadioGroup,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
  Sub: ContextMenuSub,
  SubTrigger: ContextMenuSubTrigger,
  SubContent: ContextMenuSubContent,
  Label: ContextMenuLabel,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioItem: ContextMenuRadioItem,
  Shortcut: ContextMenuShortcut,
});
