import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { XmarkIcon } from "@/icons/outline/ui-layout/sm/XmarkIcon";
import { InputGroup } from "@/components/input/InputGroup";
import { cn } from "@/utils/cn";

export const ComboboxClear = ({ className, ...props }: ComboboxPrimitive.Clear.Props) => {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroup.Button variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XmarkIcon className="size-4 pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
};
