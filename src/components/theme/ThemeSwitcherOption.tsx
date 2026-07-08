import { cva } from "class-variance-authority";
import type React from "react";
import { Select } from "@/components/select";
import { MonitorIcon } from "@/icons/outline/design-development/sm/MonitorIcon";
import { SunIcon } from "@/icons/outline/energy-environment/sm/SunIcon";
import { MoonIcon } from "@/icons/outline/weather/sm/MoonIcon";
import { cn } from "@/utils/cn";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type ThemeEntryType = {
  /** The `data-theme` value, matching the theme stylesheet in `styles/themes/`. */
  code: string;
  label: string;
  /** Overrides the group icon for this theme (used by the base themes). */
  icon?: IconType;
};

type ThemeGroupType = {
  label: string;
  icon: IconType;
  themes: readonly ThemeEntryType[];
};

/**
 * The theme catalog, grouped to mirror `styles/app.css`. Each `code` maps to a
 * `[data-theme="<code>"]` stylesheet under `styles/themes/`. Add a theme here
 * when you add its stylesheet, and it shows up in the switcher automatically.
 */
export const themeGroups = [
  {
    label: "Base",
    icon: MonitorIcon,
    themes: [
      { code: "system", label: "System", icon: MonitorIcon },
      { code: "light", label: "Light", icon: SunIcon },
      { code: "dark", label: "Dark", icon: MoonIcon },
    ],
  },
] as const satisfies readonly ThemeGroupType[];

/** Every supported theme code, in declaration order. */
export type ThemeType = (typeof themeGroups)[number]["themes"][number]["code"];

/** Icon shown for each theme (its own icon, falling back to the group's). */
export const themeIcons = Object.fromEntries(
  themeGroups.flatMap((group) =>
    group.themes.map((theme): [ThemeType, IconType] => [theme.code, "icon" in theme ? theme.icon : group.icon]),
  ),
) as Record<ThemeType, IconType>;

/** Human-readable label for each theme. */
export const themeLabels = Object.fromEntries(
  themeGroups.flatMap((group) => group.themes.map((theme): [ThemeType, string] => [theme.code, theme.label])),
) as Record<ThemeType, string>;

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
