import { cva } from "class-variance-authority";
import { useEffect } from "react";
import { Select } from "@/components/select";
import { useControlledState } from "@/hooks/useControlledState";
import { cn } from "@/utils/cn";
import { ThemeSwitcherOption, type ThemeType, themeIcons, themeLabels } from "./ThemeSwitcherOption";

/** All supported themes, in declaration order. */
const themes = Object.keys(themeLabels) as ThemeType[];

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

const themeLabelVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

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
  size = "sm",
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
        <Icon className={cn(themeIconVariants({ size }))} />
        <span className={cn(themeLabelVariants({ size }))}>{themeLabels[theme]}</span>
      </Select.Trigger>
      <Select.Content className="min-w-3xs">
        {themes.map((code) => (
          <ThemeSwitcherOption key={code} value={code} size={size} />
        ))}
      </Select.Content>
    </Select>
  );
};
