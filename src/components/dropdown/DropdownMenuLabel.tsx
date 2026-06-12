import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@/utils/cn";

type DropdownMenuLabelPropsType = MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
};

export const DropdownMenuLabel = ({ className, inset, ...props }: DropdownMenuLabelPropsType) => {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("text-muted-foreground px-2 py-1.5 text-xs font-medium data-inset:pl-8", className)}
      {...props}
    />
  );
};
