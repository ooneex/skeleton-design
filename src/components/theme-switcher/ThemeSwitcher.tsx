import { useEffect } from "react";
import { Select } from "@/components/select";
import { useControlledState } from "@/hooks/useControlledState";
import { ThemeSwitcherOption, type ThemeType, themeIcons, themeLabels } from "./ThemeSwitcherOption";

/** All supported themes, in declaration order. */
const themes = Object.keys(themeLabels) as ThemeType[];

export type ThemeSwitcherPropsType = {
  value?: ThemeType;
  defaultValue?: ThemeType;
  onChange?: (theme: ThemeType) => void;
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  /** Applied to the select trigger. */
  className?: string;
};

/**
 * A `Select`-based theme picker. Lists every supported theme (icon + label)
 * and reports the chosen one via `onChange`:
 *
 * ```tsx
 * <ThemeSwitcher defaultValue="system" onChange={(theme) => ...} />
 * ```
 *
 * The selection is controlled via `value` or uncontrolled via `defaultValue`.
 * The resolved theme is mirrored onto `<html data-theme>`, tracking the OS
 * preference while `system` is selected.
 */
export const ThemeSwitcher = ({
  className,
  value,
  defaultValue = "system",
  onChange,
  size,
  disabled,
}: ThemeSwitcherPropsType) => {
  const [theme, setTheme] = useControlledState({ value, defaultValue, onChange });

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
      <Select.Content>
        {themes.map((code) => (
          <ThemeSwitcherOption key={code} value={code} />
        ))}
      </Select.Content>
    </Select>
  );
};
