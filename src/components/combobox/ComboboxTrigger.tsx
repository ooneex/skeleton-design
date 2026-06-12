import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { ChevronDownIcon } from "@/icons/outline/arrows/sm/ChevronDownIcon";
import { cn } from "@/utils/cn";

export const ComboboxTrigger = ({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) => {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 text-muted-foreground pointer-events-none" />
    </ComboboxPrimitive.Trigger>
  );
};
