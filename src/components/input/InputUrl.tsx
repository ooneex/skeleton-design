import type { ComponentProps, ReactNode } from "react";
import { LinkIcon as LinkUrlIcon } from "@/icons/outline/editing/sm/LinkIcon";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputUrl = ({ placeholder = "https://example.com", size, ...props }: InputVariantPropsType) => {
  return (
    <InputGroup size={size}>
      <InputGroupInput type="url" placeholder={placeholder} size={size} className="placeholder:text-sm" {...props} />
      <InputGroupAddon align="inline-start">
        <LinkUrlIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};
