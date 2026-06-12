import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "@/utils/cn";

type ContextMenuLabelPropsType = ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
};

export const ContextMenuLabel = ({ className, inset, ...props }: ContextMenuLabelPropsType) => {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn("text-muted-foreground px-2 py-1.5 text-xs font-medium data-inset:pl-8", className)}
      {...props}
    />
  );
};
