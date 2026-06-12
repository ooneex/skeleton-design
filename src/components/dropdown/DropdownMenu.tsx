import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { DropdownMenuCheckboxItem } from "./DropdownMenuCheckboxItem";
import { DropdownMenuContent } from "./DropdownMenuContent";
import { DropdownMenuGroup } from "./DropdownMenuGroup";
import { DropdownMenuItem } from "./DropdownMenuItem";
import { DropdownMenuLabel } from "./DropdownMenuLabel";
import { DropdownMenuPortal } from "./DropdownMenuPortal";
import { DropdownMenuRadioGroup } from "./DropdownMenuRadioGroup";
import { DropdownMenuRadioItem } from "./DropdownMenuRadioItem";
import { DropdownMenuSeparator } from "./DropdownMenuSeparator";
import { DropdownMenuShortcut } from "./DropdownMenuShortcut";
import { DropdownMenuSub } from "./DropdownMenuSub";
import { DropdownMenuSubContent } from "./DropdownMenuSubContent";
import { DropdownMenuSubTrigger } from "./DropdownMenuSubTrigger";
import { DropdownMenuTrigger } from "./DropdownMenuTrigger";

const DropdownMenuRoot = (props: MenuPrimitive.Root.Props) => {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
};

/**
 * Dropdown menu built with the compound component pattern.
 *
 * Access sub-components as static properties, e.g.
 * `DropdownMenu.Trigger`, `DropdownMenu.Content`, `DropdownMenu.Item`.
 */
export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Portal: DropdownMenuPortal,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Group: DropdownMenuGroup,
  Label: DropdownMenuLabel,
  Item: DropdownMenuItem,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
});
