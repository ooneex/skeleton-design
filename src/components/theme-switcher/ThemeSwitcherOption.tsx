import type React from "react";
import { Select } from "@/components/select";
import { MonitorIcon } from "@/icons/outline/design-development/sm/MonitorIcon";
import { PaletteIcon } from "@/icons/outline/design-development/sm/PaletteIcon";
import { SunIcon } from "@/icons/outline/energy-environment/sm/SunIcon";
import { MoonIcon } from "@/icons/outline/weather/sm/MoonIcon";

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

export type ThemeSwitcherOptionPropsType = Omit<React.ComponentProps<typeof Select.Item>, "value"> & {
  value: ThemeType;
};

export const ThemeSwitcherOption = ({ value, children, ...props }: ThemeSwitcherOptionPropsType) => {
  const Icon = themeIcons[value];

  return (
    <Select.Item data-slot="theme-switcher-option" value={value} {...props}>
      {children ?? (
        <>
          <Icon />
          {themeLabels[value]}
        </>
      )}
    </Select.Item>
  );
};
