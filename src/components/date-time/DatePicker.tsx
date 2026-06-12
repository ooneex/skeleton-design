import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { CalendarIcon } from "@/icons/outline/time/sm/CalendarIcon";
import { Calendar, type CalendarPropsType } from "@/components/calendar/Calendar";
import { useDrawerContentRef } from "@/components/drawer/drawerContext";
import { Popover } from "@/components/popover/Popover";
import { PopoverContent } from "@/components/popover/PopoverContent";
import { PopoverTrigger } from "@/components/popover/PopoverTrigger";
import { cn } from "@/utils/cn";

export const datePickerVariants = cva(
  "w-full justify-between text-left font-normal flex items-center gap-2 rounded ring-ring-active ring bg-transparent transition-[color,box-shadow] cursor-pointer hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring-active disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        xs: "h-6 px-1.5 py-0.5 text-xs",
        sm: "h-8 px-2 py-1 text-sm",
        md: "h-9 px-2.5 py-1.5 text-base",
        lg: "h-10 px-3 py-2 text-base",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

type DatePickerPropsType = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  formatDisplay?: (date: Date, locale: string) => string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  calendarProps?: Omit<CalendarPropsType, "mode" | "selected" | "onSelect">;
  align?: "start" | "center" | "end";
  trigger?: React.ReactElement;
  locale?: string;
} & VariantProps<typeof datePickerVariants>;

const defaultFormatDisplay = (date: Date, locale: string): string => {
  return date.toLocaleDateString(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const DatePicker = ({
  value,
  onChange,
  formatDisplay = defaultFormatDisplay,
  placeholder = "Select a date",
  disabled,
  size,
  className,
  calendarProps,
  align = "start",
  trigger,
  locale,
}: DatePickerPropsType) => {
  const resolvedLocale = locale ?? (typeof navigator !== "undefined" ? navigator.language : "en");
  const [open, setOpen] = React.useState(false);
  const drawerContentRef = useDrawerContentRef();

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      {trigger ? (
        <PopoverTrigger render={trigger} />
      ) : (
        <PopoverTrigger
          disabled={disabled}
          className={cn(datePickerVariants({ size }), open && "ring-ring-active", className)}
        >
          {value ? formatDisplay(value, resolvedLocale) : <span className="text-muted-foreground">{placeholder}</span>}
          <CalendarIcon className={cn("size-4", open ? "text-foreground" : "text-muted-foreground")} />
        </PopoverTrigger>
      )}
      <PopoverContent className="w-auto p-2" align={align} container={drawerContentRef}>
        <Calendar fullWidth mode="single" selected={value} onSelect={onChange} {...calendarProps} />
      </PopoverContent>
    </Popover>
  );
};
