import type { ComponentProps, ReactNode } from "react";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";
import { MagnifierIcon as SearchIcon } from "@/icons/outline/filtering-sorting/sm/MagnifierIcon";
import { cn } from "@/utils/cn";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputSearch = ({
  placeholder = "Search...",
  size,
  className,
  groupClassName,
  iconClassName,
  ...props
}: InputVariantPropsType) => {
  return (
    <InputGroup size={size} className={groupClassName}>
      <InputGroupInput
        placeholder={placeholder}
        size={size}
        className={cn("placeholder:text-sm", className)}
        {...props}
      />
      <InputGroupAddon align="inline-start">
        <SearchIcon className={iconClassName} />
      </InputGroupAddon>
    </InputGroup>
  );
};

InputSearch.displayName = "InputSearch";
