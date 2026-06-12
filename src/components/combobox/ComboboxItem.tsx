import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { CheckIcon } from "@/icons/outline/ui-layout/sm/CheckIcon";
import { cn } from "@/utils/cn";

export const ComboboxItem = ({ className, children, ...props }: ComboboxPrimitive.Item.Props) => {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "data-highlighted:bg-accent gap-2 rounded py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />}
      >
        <CheckIcon className="size-4 pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
};
