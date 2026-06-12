import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import type * as React from "react";
import { cn } from "@/utils/cn";

type ContextMenuItemPropsType = ContextMenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
  color?: string;
};

export const ContextMenuItem = ({
  className,
  inset,
  variant = "default",
  color,
  style,
  ...props
}: ContextMenuItemPropsType) => {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive gap-2 rounded px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 group/context-menu-item relative flex cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        !color && "not-data-[variant=destructive]:focus:**:text-accent-foreground",
        color && "focus:bg-(--item-color)/10",
        className,
      )}
      style={color ? ({ "--item-color": color, ...style } as unknown as React.CSSProperties) : style}
      {...props}
    />
  );
};
