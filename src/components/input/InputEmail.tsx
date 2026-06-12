import type { ComponentProps, ReactNode } from "react";
import { EnvelopeIcon as EmailIcon } from "@/icons/outline/communication/sm/EnvelopeIcon";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputEmail = ({ placeholder = "email@example.com", size, ...props }: InputVariantPropsType) => {
  return (
    <InputGroup size={size}>
      <InputGroupInput type="email" placeholder={placeholder} size={size} className="placeholder:text-sm" {...props} />
      <InputGroupAddon align="inline-start">
        <EmailIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};
