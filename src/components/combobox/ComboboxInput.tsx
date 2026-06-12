import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { InputGroup } from "@/components/input/InputGroup";
import { cn } from "@/utils/cn";
import { ComboboxClear } from "./ComboboxClear";
import { ComboboxTrigger } from "./ComboboxTrigger";

type ComboboxInputPropsType = ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
};

export const ComboboxInput = ({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxInputPropsType) => {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input render={<InputGroup.Input disabled={disabled} />} {...props} />
      <InputGroup.Addon align="inline-end">
        {showTrigger && (
          <InputGroup.Button
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroup.Addon>
      {children}
    </InputGroup>
  );
};
