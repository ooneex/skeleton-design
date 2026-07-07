import { useEffect } from "react";
import { Select } from "@/components/select";
import { useControlledState } from "@/hooks/useControlledState";
import { LanguageSwitcherOption, type LanguageType, languageFlags, languageLabels } from "./LanguageSwitcherOption";

/** All supported languages, in declaration order. */
const languages = Object.keys(languageLabels) as LanguageType[];

export type LanguageSwitcherPropsType = {
  value?: LanguageType;
  defaultValue?: LanguageType;
  onChange?: (language: LanguageType) => void;
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  /** Applied to the select trigger. */
  className?: string;
};

/**
 * A `Select`-based language picker. Lists every supported language (flag +
 * label) and reports the chosen one via `onChange`:
 *
 * ```tsx
 * <LanguageSwitcher defaultValue="en" onChange={(lang) => ...} />
 * ```
 *
 * The selection is controlled via `value` or uncontrolled via `defaultValue`,
 * and the active language is mirrored onto `<html lang>`.
 */
export const LanguageSwitcher = ({
  className,
  value,
  defaultValue = "en",
  onChange,
  size,
  disabled,
}: LanguageSwitcherPropsType) => {
  const [language, setLanguage] = useControlledState({ value, defaultValue, onChange });

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
      <Select.Content>
        {languages.map((code) => (
          <LanguageSwitcherOption key={code} value={code} />
        ))}
      </Select.Content>
    </Select>
  );
};
