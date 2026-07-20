import type { ComponentProps, ReactNode } from "react";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";
import { UserIcon } from "@/icons/outline/users/sm/UserIcon";
import { cn } from "@/utils/cn";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputFirstName = ({
  placeholder = "First name",
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
        <UserIcon className={iconClassName} />
      </InputGroupAddon>
    </InputGroup>
  );
};

InputFirstName.displayName = "InputFirstName";
