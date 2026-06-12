import type { ComponentProps, ReactNode } from "react";
import { UserIcon } from "@/icons/outline/users/sm/UserIcon";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputFirstName = ({ placeholder = "First name", size, ...props }: InputVariantPropsType) => {
  return (
    <InputGroup size={size}>
      <InputGroupInput placeholder={placeholder} size={size} className="placeholder:text-sm" {...props} />
      <InputGroupAddon align="inline-start">
        <UserIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};
