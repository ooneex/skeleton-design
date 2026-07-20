import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import type * as React from "react";
import { cn } from "@/utils/cn";

type ComboboxChipsPropsType = React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props;

export const ComboboxChips = ({ className, ...props }: ComboboxChipsPropsType) => {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "ring-ring-active ring has-aria-invalid:ring-destructive/20 flex min-h-9 flex-wrap items-center gap-1.5 rounded bg-transparent bg-clip-padding px-2.5 py-1.5 text-sm transition-[color,box-shadow] focus-within:ring-ring-active has-data-[slot=combobox-chip]:px-1.5",
        className,
      )}
      {...props}
    />
  );
};
ComboboxChips.displayName = "Combobox.Chips";
