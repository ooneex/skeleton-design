import type React from "react";
import { useEffect } from "react";
import { Select } from "@/components/select";
import { useControlledState } from "@/hooks/useControlledState";
import { ThemeSwitcherOption, type ThemeType, themeIcons, themeLabels } from "./ThemeSwitcherOption";

export type ThemeSwitcherPropsType = {
  value?: ThemeType;
  defaultValue?: ThemeType;
  onValueChange?: (theme: ThemeType) => void;
  size?: "sm" | "md";
  disabled?: boolean;
  /** Applied to the select trigger. */
  className?: string;
  children?: React.ReactNode;
};

const ThemeSwitcherRoot = ({
  className,
  value,
  defaultValue = "system",
  onValueChange,
  size,
  disabled,
  children,
}: ThemeSwitcherPropsType) => {
  const [theme, setTheme] = useControlledState({ value, defaultValue, onChange: onValueChange });

  /** Reflect the selection on <html> so the `.light`/`.dark` theme stylesheets apply. */
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = () => {
      const resolved = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      document.documentElement.dataset.theme = resolved;
    };

    apply();

    if (theme !== "system") return;

    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);

  const Icon = themeIcons[theme];

  return (
    <Select value={theme} onValueChange={(next) => next && setTheme(next)} disabled={disabled}>
      <Select.Trigger data-slot="theme-switcher" aria-label="Theme" size={size} className={className}>
        <Select.Value>
          <Icon />
          {themeLabels[theme]}
        </Select.Value>
      </Select.Trigger>
      <Select.Content>{children}</Select.Content>
    </Select>
  );
};

/**
 * Compound component built on `Select`. Sub-components are attached as
 * properties on `ThemeSwitcher`, so a single import exposes the whole API:
 *
 * ```tsx
 * <ThemeSwitcher defaultValue="system">
 *   <ThemeSwitcher.Option value="light" />
 *   <ThemeSwitcher.Option value="dark" />
 *   <ThemeSwitcher.Option value="system" />
 * </ThemeSwitcher>
 * ```
 *
 * Options render a default icon and label per theme; pass children to
 * customize. The root owns the selection (controlled via `value` or
 * uncontrolled via `defaultValue`) and mirrors the resolved theme onto
 * `<html data-theme>`, tracking the OS preference while `system` is selected.
 */
export const ThemeSwitcher = Object.assign(ThemeSwitcherRoot, {
  Option: ThemeSwitcherOption,
});
