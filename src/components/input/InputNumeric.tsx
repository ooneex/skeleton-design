import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { MinusIcon } from "@/icons/outline/ui-layout/sm/MinusIcon";
import { PlusIcon } from "@/icons/outline/ui-layout/sm/PlusIcon";
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input/Input";
import { cn } from "@/utils/cn";

const inputNumericContainerVariants = cva(
  "flex items-center rounded border border-input transition-[color,box-shadow]",
  {
    variants: {
      size: {
        xs: "h-6",
        sm: "h-8",
        md: "h-9",
        lg: "h-10",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

type ButtonSizeType = "icon-xs" | "icon-sm" | "icon" | "icon-lg";

const inputNumericButtonSizeMap: Record<
  NonNullable<VariantProps<typeof inputNumericContainerVariants>["size"]>,
  ButtonSizeType
> = {
  xs: "icon-xs",
  sm: "icon-sm",
  md: "icon-sm",
  lg: "icon",
};

const inputNumericIconVariants = cva("", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-4",
      lg: "size-5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const inputNumericInputVariants = cva("border-none bg-transparent text-center shadow-none", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-base",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

type InputNumericPropsType = VariantProps<typeof inputNumericContainerVariants> & {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  pad?: boolean;
  wrap?: boolean;
  className?: string;
};

export const InputNumeric = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  value: controlledValue,
  onChange,
  pad = false,
  wrap = false,
  size = "sm",
  className,
}: InputNumericPropsType) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = (newValue: number) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    if (inputValue === "") {
      setValue(min);
      return;
    }
    const newValue = Number.parseInt(inputValue, 10);
    if (!Number.isNaN(newValue) && newValue >= min && newValue <= max) {
      setValue(newValue);
    } else if (newValue > max) {
      setValue(max);
    }
  };

  const incrementValue = () => {
    if (wrap && value >= max) {
      setValue(min);
    } else {
      const newValue = Math.min(value + step, max);
      setValue(newValue);
    }
  };

  const decrementValue = () => {
    if (wrap && value <= min) {
      setValue(max);
    } else {
      const newValue = Math.max(value - step, min);
      setValue(newValue);
    }
  };

  const displayValue = pad ? String(value).padStart(2, "0") : value;

  const buttonSize = inputNumericButtonSizeMap[size ?? "sm"];

  return (
    <div className={cn("w-full max-w-xs", className)}>
      <div className="relative">
        <div
          className={cn(inputNumericContainerVariants({ size }), isFocused && "border-ring ring-[3px] ring-ring/50")}
        >
          <Button
            variant="ghost"
            size={buttonSize}
            onClick={decrementValue}
            aria-label="Decrement button"
            className="h-full"
          >
            <MinusIcon className={inputNumericIconVariants({ size })} />
          </Button>
          <Input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn("h-auto", inputNumericInputVariants({ size }))}
          />
          <Button
            variant="ghost"
            size={buttonSize}
            onClick={incrementValue}
            aria-label="Increment button"
            className="h-full"
          >
            <PlusIcon className={inputNumericIconVariants({ size })} />
          </Button>
        </div>
      </div>
    </div>
  );
};
