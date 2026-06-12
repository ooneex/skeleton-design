import type { ComponentProps, ReactNode } from "react";
import { CreditCardIcon as PaymentIcon } from "@/icons/outline/business-finance/sm/CreditCardIcon";
import { InputGroup } from "@/components/input/InputGroup";
import { InputGroupAddon } from "@/components/input/InputGroupAddon";
import { InputGroupInput } from "@/components/input/InputGroupInput";

type InputVariantPropsType = Omit<ComponentProps<typeof InputGroupInput>, "type"> & {
  groupClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export const InputCreditCard = ({ placeholder = "1234 5678 9012 3456", size, ...props }: InputVariantPropsType) => {
  return (
    <InputGroup size={size}>
      <InputGroupInput placeholder={placeholder} size={size} className="placeholder:text-sm" {...props} />
      <InputGroupAddon align="inline-start">
        <PaymentIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};
