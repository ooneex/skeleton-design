import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { CheckIcon } from "@/icons/outline/ui-layout/sm/CheckIcon";
import { cn } from "@/utils/cn";

/** Selectable command entry with an optional checked indicator. */
export const CommandItem = ({ className, children, ...props }: ComponentProps<typeof CommandPrimitive.Item>) => {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-selected:bg-accent data-selected:text-accent-foreground data-selected:**:[svg]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-lg px-2 py-2 text-sm outline-hidden select-none transition-colors duration-150 [&_svg:not([class*='size-'])]:size-4 group/command-item data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <CheckIcon className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  );
};
