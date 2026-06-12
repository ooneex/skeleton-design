import type { ComponentProps, ReactNode } from "react";
import { MagnifierIcon as SearchIcon } from "@/icons/outline/filtering-sorting/sm/MagnifierIcon";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputSearch = ({ placeholder = "Search...", size, groupClassName, ...props }: InputVariantPropsType) => {
  return (
    <InputGroup size={size} className={groupClassName}>
      <InputGroupInput placeholder={placeholder} size={size} className="placeholder:text-sm" {...props} />
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};
