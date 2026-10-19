import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "zh", "it", "ar"],
  defaultLocale: "en",
  // English keeps bare URLs (e.g. /products) since that's what's already
  // indexed; fr/zh/it get a prefix (/fr/products) rather than renaming the
  // canonical English routes.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  zh: "中文",
  it: "Italiano",
  ar: "العربية",
};

export const RTL_LOCALES: ReadonlySet<Locale> = new Set(["ar"]);
