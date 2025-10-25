"use client";

import { usePathname } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Language } from "@/i18n/settings";

type LanguageSwitcherProps = {
  lng: Language;
};

export default function LanguageSwitcher({ lng }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const languageOptions = [
    { code: "en", label: "English" },
    { code: "uz", label: "Oʻzbekcha" },
    { code: "ru", label: "Русский" },
  ];

  const getLocalizedPath = (locale: string) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split("/");
    // Ensure there is always at least an empty first segment
    if (segments.length < 2) return `/${locale}`;
    segments[1] = locale;
    return segments.join("/");
  };

  const handleLanguageChange = (newLang: string) => {
    const target = getLocalizedPath(newLang);
    // Use full navigation to force server-rendered locale route
    window.location.href = target;
  };

  return (
    <div className="flex items-center gap-3">
      <Select value={lng} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue>
            {languageOptions.find((lang) => lang.code === lng)?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
