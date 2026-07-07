import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "@/icons/outline/arrows/sm/ChevronDownIcon";
import { cn } from "@/utils/cn";

const selectTriggerVariants = cva(
  "border-input data-placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive gap-1.5 rounded border bg-transparent py-2 pr-2 pl-2.5 text-sm transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      size: {
        xs: "h-6 rounded-[min(var(--radius-md),8px)]",
        sm: "h-8 rounded-[min(var(--radius-md),10px)]",
        md: "h-9",
        lg: "h-10",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

type SelectTriggerPropsType = SelectPrimitive.Trigger.Props & VariantProps<typeof selectTriggerVariants>;

/** The button that opens the select popup and shows the value. */
export const SelectTrigger = ({ className, size = "sm", children, ...props }: SelectTriggerPropsType) => {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon render={<ChevronDownIcon className="size-4 text-foreground pointer-events-none" />} />
    </SelectPrimitive.Trigger>
  );
};

export { selectTriggerVariants };
