import type { ComponentProps, ReactNode } from "react";
import { MagnifierIcon as SearchIcon } from "@/icons/outline/filtering-sorting/sm/MagnifierIcon";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";
import { cn } from "@/utils/cn";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputSearchLight = ({
  placeholder = "Search...",
  size = "md",
  groupClassName,
  iconClassName,
  ...props
}: InputVariantPropsType) => {
  return (
    <InputGroup
      size={size}
      className={cn(
        "border-none w-fit has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0",
        groupClassName,
      )}
    >
      <InputGroupInput className="p-0 placeholder:text-sm" placeholder={placeholder} size={size} {...props} />
      <InputGroupAddon align="inline-start" className="p-0">
        <SearchIcon className={iconClassName} />
      </InputGroupAddon>
    </InputGroup>
  );
};
