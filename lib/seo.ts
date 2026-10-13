import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/nav";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_CA",
  fr: "fr_CA",
  zh: "zh_CN",
  it: "it_IT",
};

/**
 * Builds the `alternates.languages` map Next.js Metadata expects for
 * hreflang tags, plus `x-default`, for a given locale-agnostic pathname
 * (e.g. "/products/tl15", or "" for the home page). Mirrors the routing
 * config's `localePrefix: "as-needed"` — English gets a bare URL, the rest
 * get a locale prefix.
 */
export function localizedAlternates(pathname: string): Record<string, string> {
  const clean = pathname === "/" ? "" : pathname;
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    languages[locale] = `${SITE_URL}${prefix}${clean}` || SITE_URL;
  }
  languages["x-default"] = `${SITE_URL}${clean}` || SITE_URL;
  return languages;
}

/** Canonical URL for a given locale + locale-agnostic pathname. */
export function canonicalFor(locale: Locale, pathname: string): string {
  const clean = pathname === "/" ? "" : pathname;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${clean}` || SITE_URL;
}

/**
 * Builds a complete per-page Metadata object: canonical URL, hreflang
 * alternates for every locale, and matching OpenGraph/Twitter tags — so
 * every page gets consistent, locale-aware SEO metadata from one call
 * instead of hand-rolling `alternates`/`openGraph` in each page file.
 */
export function buildMetadata({
  locale,
  pathname,
  title,
  description,
  image,
  noIndex,
  type = "website",
  publishedTime,
}: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = canonicalFor(locale, pathname);
  const images = image ? [{ url: image }] : undefined;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: localizedAlternates(pathname),
    },
    openGraph:
      type === "article"
        ? {
            type: "article",
            title,
            description,
            url,
            siteName: "Torvault Safe Company",
            locale: OG_LOCALE[locale],
            images,
            publishedTime,
          }
        : {
            type: "website",
            title,
            description,
            url,
            siteName: "Torvault Safe Company",
            locale: OG_LOCALE[locale],
            images,
          },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
