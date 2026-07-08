import { cva } from "class-variance-authority";
import type React from "react";
import { Select } from "@/components/select";
import { MonitorIcon } from "@/icons/outline/design-development/sm/MonitorIcon";
import { PaletteIcon } from "@/icons/outline/design-development/sm/PaletteIcon";
import { SunIcon } from "@/icons/outline/energy-environment/sm/SunIcon";
import { MoonIcon } from "@/icons/outline/weather/sm/MoonIcon";
import { cn } from "@/utils/cn";

export type ThemeType = "light" | "dark" | "secondary" | "system";

export const themeIcons: Record<ThemeType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  light: SunIcon,
  dark: MoonIcon,
  secondary: PaletteIcon,
  system: MonitorIcon,
};

export const themeLabels: Record<ThemeType, string> = {
  light: "Light",
  dark: "Dark",
  secondary: "Secondary",
  system: "System",
};

const themeIconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
      md: "size-4.5",
      lg: "size-5",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type ThemeSwitcherOptionPropsType = Omit<React.ComponentProps<typeof Select.Item>, "value"> & {
  value: ThemeType;
};

export const ThemeSwitcherOption = ({ value, size = "sm", children, ...props }: ThemeSwitcherOptionPropsType) => {
  const Icon = themeIcons[value];

  return (
    <Select.Item data-slot="theme-switcher-option" value={value} size={size} {...props}>
      {children ?? (
        <>
          <Icon className={cn(themeIconVariants({ size }))} />
          {themeLabels[value]}
        </>
      )}
    </Select.Item>
  );
};
