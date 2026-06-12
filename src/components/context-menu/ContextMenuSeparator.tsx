import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "@/utils/cn";

type ContextMenuSeparatorPropsType = ContextMenuPrimitive.Separator.Props;

export const ContextMenuSeparator = ({ className, ...props }: ContextMenuSeparatorPropsType) => {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("bg-ring -mx-1 my-1 h-[0.4px]", className)}
      {...props}
    />
  );
};
