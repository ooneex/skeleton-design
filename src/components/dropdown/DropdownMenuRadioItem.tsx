import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon } from "@/icons/outline/ui-layout/sm/CheckIcon";
import { cn } from "@/utils/cn";

type DropdownMenuRadioItemPropsType = MenuPrimitive.RadioItem.Props;

export const DropdownMenuRadioItem = ({ className, children, ...props }: DropdownMenuRadioItemPropsType) => {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon className="size-4" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
};
