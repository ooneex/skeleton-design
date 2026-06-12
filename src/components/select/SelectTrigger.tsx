import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDownIcon } from "@/icons/outline/arrows/sm/ChevronDownIcon";
import { cn } from "@/utils/cn";

type SelectTriggerPropsType = SelectPrimitive.Trigger.Props & {
  size?: "sm" | "md";
};

/** The button that opens the select popup and shows the value. */
export const SelectTrigger = ({ className, size = "sm", children, ...props }: SelectTriggerPropsType) => {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive gap-1.5 rounded border bg-transparent py-2 pr-2 pl-2.5 text-sm transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] data-[size=md]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon render={<ChevronDownIcon className="size-4 text-foreground pointer-events-none" />} />
    </SelectPrimitive.Trigger>
  );
};
