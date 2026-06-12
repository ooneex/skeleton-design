import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { ChevronRightIcon } from "@/icons/outline/arrows/sm/ChevronRightIcon";
import { cn } from "@/utils/cn";

type ContextMenuSubTriggerPropsType = ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
};

export const ContextMenuSubTrigger = ({ className, inset, children, ...props }: ContextMenuSubTriggerPropsType) => {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground gap-2 rounded px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-pointer items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-3.5" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
};
