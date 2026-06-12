import type { ComponentProps, ReactNode } from "react";
import { LockPasswordIcon as PasswordIcon } from "@/icons/outline/design-development/sm/LockPasswordIcon";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputPassword = ({ placeholder = "Password", size, ...props }: InputVariantPropsType) => {
  return (
    <InputGroup size={size}>
      <InputGroupInput
        type="password"
        placeholder={placeholder}
        size={size}
        className="placeholder:text-sm"
        {...props}
      />
      <InputGroupAddon align="inline-start">
        <PasswordIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};
