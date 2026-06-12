import { SIMPLE_COLOR_NAMES, SIMPLE_COLORS, type SimpleColorType } from "@ooneex/color";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { PaletteIcon as ColorIcon } from "@/icons/outline/design-development/sm/PaletteIcon";
import { CheckIcon } from "@/icons/outline/ui-layout/sm/CheckIcon";
import { CircleMinusIcon as RemoveIcon } from "@/icons/outline/ui-layout/sm/CircleMinusIcon";
import { Button } from "@/components/button/Button";
import { useDrawerContentRef } from "@/components/drawer/drawerContext";
import { Popover } from "@/components/popover/Popover";
import { PopoverContent } from "@/components/popover/PopoverContent";
import { PopoverTrigger } from "@/components/popover/PopoverTrigger";
import { cn } from "@/utils/cn";

const simpleColorPickerVariants = cva(
  "w-full justify-between text-left font-normal flex items-center gap-2 rounded ring-ring-active ring bg-transparent transition-[color,box-shadow] cursor-pointer hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring-active disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        xs: "h-6 px-2 py-0.5 text-xs",
        sm: "h-8 px-2.5 py-1 text-sm",
        md: "h-9 px-2.5 py-1 text-base",
        lg: "h-10 px-3 py-1.5 text-base",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export type SimpleColorPickerPropsType = {
  value?: SimpleColorType;
  onChange?: (value: SimpleColorType) => void;
  onReset?: () => void;
  disabled?: boolean;
  colors?: readonly SimpleColorType[];
  align?: "start" | "center" | "end";
  className?: string;
  contentClassName?: string;
  trigger?: React.ReactElement;
} & VariantProps<typeof simpleColorPickerVariants>;

export const SimpleColorPicker = ({
  value,
  onChange,
  onReset,
  disabled,
  colors = SIMPLE_COLORS,
  align = "start",
  size,
  className,
  contentClassName,
  trigger,
}: SimpleColorPickerPropsType) => {
  const [selectedColor, setSelectedColor] = React.useState<SimpleColorType>(value ?? colors[0] ?? "#3B82F6");
  const [open, setOpen] = React.useState(false);
  const drawerContentRef = useDrawerContentRef();

  React.useEffect(() => {
    if (value) {
      setSelectedColor(value);
    }
  }, [value]);

  const handleColorSelect = React.useCallback(
    (color: SimpleColorType) => {
      setSelectedColor(color);
      setOpen(false);
      if (onChange) {
        onChange(color);
      }
    },
    [onChange],
  );

  const handleReset = React.useCallback(() => {
    setOpen(false);
    if (onReset) {
      onReset();
    }
  }, [onReset]);

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      {trigger ? (
        <PopoverTrigger render={trigger} />
      ) : (
        <PopoverTrigger
          disabled={disabled}
          className={cn(simpleColorPickerVariants({ size }), open && "ring-ring-active", className)}
        >
          <span className="flex items-center gap-2">
            <span className="size-4 rounded-full shrink-0" style={{ backgroundColor: selectedColor }} />
            <span>{SIMPLE_COLOR_NAMES[selectedColor]}</span>
          </span>
          <ColorIcon className={cn("size-4", open ? "text-foreground" : "text-muted-foreground")} />
        </PopoverTrigger>
      )}
      <PopoverContent className={cn("w-auto p-3", contentClassName)} align={align} container={drawerContentRef}>
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(2rem, 1fr))" }}>
          {colors.map((color) => {
            const isSelected = color === selectedColor;
            return (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                title={SIMPLE_COLOR_NAMES[color]}
                className={cn(
                  "size-8 rounded-full cursor-pointer transition-all flex items-center justify-center",
                  "motion-safe:hover:scale-110",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                  color === "#FFFFFF" && !isSelected && "ring ring-ring-active",
                )}
                style={{ backgroundColor: color }}
              >
                {isSelected && <CheckIcon className="size-4 text-white drop-shadow-sm" />}
              </button>
            );
          })}
        </div>
        {onReset && (
          <Button variant="ghost" onClick={handleReset} className="w-full">
            <RemoveIcon className="size-6" />
            Reset
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export { simpleColorPickerVariants };
