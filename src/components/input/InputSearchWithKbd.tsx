import type { ComponentProps, ReactNode } from "react";
import { MagnifierIcon as SearchIcon } from "@/icons/outline/filtering-sorting/sm/MagnifierIcon";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";
import { Kbd } from "@/components/kbd/Kbd";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputSearchWithKbd = ({ placeholder = "Search...", size, ...props }: InputVariantPropsType) => {
  return (
    <InputGroup size={size}>
      <InputGroupInput placeholder={placeholder} size={size} className="placeholder:text-sm" {...props} />
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  );
};
