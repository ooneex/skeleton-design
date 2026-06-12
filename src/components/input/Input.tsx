import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { cn } from "@/utils/cn";

const inputVariants = cva(
  "ring-ring-active ring focus-visible:ring-ring-active aria-invalid:ring-destructive/20 aria-invalid:ring-destructive rounded bg-transparent transition-[color,box-shadow] file:text-foreground placeholder:text-muted-foreground/60 w-full min-w-0 outline-none file:inline-flex file:ring-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 leading-relaxed",
  {
    variants: {
      size: {
        xs: "h-6 px-2 py-0.5 text-xs rounded-[min(var(--radius-md),8px)] file:h-5 file:text-xs file:font-medium",
        sm: "h-8 px-2.5 py-1 text-sm rounded-[min(var(--radius-md),10px)] file:h-6 file:text-xs file:font-medium",
        md: "h-9 px-2.5 py-1 text-base file:h-7 file:text-base file:font-medium",
        lg: "h-10 px-3 py-1.5 text-base file:h-8 file:text-base file:font-medium",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

type InputPropsType = Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>;

export const Input = ({ className, type, size = "sm", value, defaultValue, onChange, ...props }: InputPropsType) => {
  const isControlled = value !== undefined;
  const [uncontrolledHasValue, setUncontrolledHasValue] = useState(!!String(defaultValue ?? "").trim());

  const hasValue = isControlled ? !!String(value).trim() : uncontrolledHasValue;

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => {
        if (!isControlled) setUncontrolledHasValue(!!e.target.value.trim());
        onChange?.(e);
      }}
      className={cn(inputVariants({ size }), hasValue && "ring-ring-active", className)}
      {...props}
    />
  );
};

export { inputVariants };
