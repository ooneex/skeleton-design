import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cn } from "@/utils/cn";

export const ComboboxList = ({ className, ...props }: ComboboxPrimitive.List.Props) => {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0 overscroll-contain",
        className,
      )}
      {...props}
    />
  );
};
