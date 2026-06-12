import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@/utils/cn";

type DropdownMenuSeparatorPropsType = MenuPrimitive.Separator.Props;

export const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuSeparatorPropsType) => {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-ring-active -mx-1 my-1 h-[0.4px]", className)}
      {...props}
    />
  );
};
