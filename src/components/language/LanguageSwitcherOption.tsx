import type React from "react";
import { Select } from "@/components/select";
import { EnglishFlag } from "./flags/EnglishFlag";
import { FranceFlag } from "./flags/FranceFlag";
import { GermanyFlag } from "./flags/GermanyFlag";
import { GreeceFlag } from "./flags/GreeceFlag";
import { PortugalFlag } from "./flags/PortugalFlag";
import { RomaniaFlag } from "./flags/RomaniaFlag";
import { SpainFlag } from "./flags/SpainFlag";
import { SweedenFlag } from "./flags/SweedenFlag";

export type LanguageType = "en" | "fr" | "de" | "el" | "pt" | "ro" | "es" | "sv";

export const languageFlags: Record<LanguageType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  en: EnglishFlag,
  fr: FranceFlag,
  de: GermanyFlag,
  el: GreeceFlag,
  pt: PortugalFlag,
  ro: RomaniaFlag,
  es: SpainFlag,
  sv: SweedenFlag,
};

export const languageLabels: Record<LanguageType, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  el: "Ελληνικά",
  pt: "Português",
  ro: "Română",
  es: "Español",
  sv: "Svenska",
};

export type LanguageSwitcherOptionPropsType = Omit<React.ComponentProps<typeof Select.Item>, "value"> & {
  value: LanguageType;
};

export const LanguageSwitcherOption = ({ value, children, ...props }: LanguageSwitcherOptionPropsType) => {
  const Flag = languageFlags[value];

  return (
    <Select.Item data-slot="language-switcher-option" value={value} {...props}>
      {children ?? (
        <>
          <Flag />
          {languageLabels[value]}
        </>
      )}
    </Select.Item>
  );
};
