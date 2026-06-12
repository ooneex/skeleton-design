import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ChevronRightIcon } from "@/icons/outline/arrows/sm/ChevronRightIcon";
import { cn } from "@/utils/cn";

type DropdownMenuSubTriggerPropsType = MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
};

export const DropdownMenuSubTrigger = ({ className, inset, children, ...props }: DropdownMenuSubTriggerPropsType) => {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 data-popup-open:bg-accent data-popup-open:text-accent-foreground flex cursor-default items-center outline-hidden select-none data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="size-4 ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  );
};
