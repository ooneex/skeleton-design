import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { ScrollArea } from "@/components/scroll-area";
import { cn } from "@/utils/cn";

export const ComboboxList = ({ className, children, ...props }: ComboboxPrimitive.List.Props) => {
  return (
    <ScrollArea viewportClassName="max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overscroll-contain">
      <ComboboxPrimitive.List
        data-slot="combobox-list"
        className={cn("p-1 data-empty:p-0", className)}
        {...props}
      >
        {children}
      </ComboboxPrimitive.List>
    </ScrollArea>
  );
};
ComboboxList.displayName = "Combobox.List";
