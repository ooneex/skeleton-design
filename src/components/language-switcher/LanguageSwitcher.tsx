import type React from "react";
import { useEffect } from "react";
import { Select } from "@/components/select";
import { useControlledState } from "@/hooks/useControlledState";
import { LanguageSwitcherOption, type LanguageType, languageFlags, languageLabels } from "./LanguageSwitcherOption";

export type LanguageSwitcherPropsType = {
  value?: LanguageType;
  defaultValue?: LanguageType;
  onValueChange?: (language: LanguageType) => void;
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  /** Applied to the select trigger. */
  className?: string;
  children?: React.ReactNode;
};

const LanguageSwitcherRoot = ({
  className,
  value,
  defaultValue = "en",
  onValueChange,
  size,
  disabled,
  children,
}: LanguageSwitcherPropsType) => {
  const [language, setLanguage] = useControlledState({ value, defaultValue, onChange: onValueChange });

  /** Reflect the selection on <html lang> so assistive tech and CSS can react to it. */
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const Flag = languageFlags[language];

  return (
    <Select value={language} onValueChange={(next) => next && setLanguage(next)} disabled={disabled}>
      <Select.Trigger data-slot="language-switcher" aria-label="Language" size={size} className={className}>
        <Select.Value>
          <Flag />
          {languageLabels[language]}
        </Select.Value>
      </Select.Trigger>
      <Select.Content>{children}</Select.Content>
    </Select>
  );
};

/**
 * Compound component built on `Select`. Sub-components are attached as
 * properties on `LanguageSwitcher`, so a single import exposes the whole API:
 *
 * ```tsx
 * <LanguageSwitcher defaultValue="en">
 *   <LanguageSwitcher.Option value="en" />
 *   <LanguageSwitcher.Option value="fr" />
 *   <LanguageSwitcher.Option value="de" />
 * </LanguageSwitcher>
 * ```
 *
 * Options render a default flag and label per language; pass children to
 * customize. The root owns the selection (controlled via `value` or
 * uncontrolled via `defaultValue`) and mirrors the active language onto
 * `<html lang>`.
 */
export const LanguageSwitcher = Object.assign(LanguageSwitcherRoot, {
  Option: LanguageSwitcherOption,
});
