import type { ComponentProps } from "react";
import { MinusIcon } from "@/icons/outline/ui-layout/sm/MinusIcon";
import { cn } from "@/utils/cn";

export const InputOTPSeparator = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="input-otp-separator"
      aria-hidden="true"
      className={cn("flex items-center text-muted-foreground", className)}
      {...props}
    >
      <MinusIcon className="size-4" />
    </div>
  );
};

InputOTPSeparator.displayName = "InputOTP.Separator";
