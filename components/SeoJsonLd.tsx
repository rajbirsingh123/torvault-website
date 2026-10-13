import { SITE_URL } from "@/lib/nav";
import { canonicalFor } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

/**
 * Sitewide Organization + WebSite structured data, rendered once from the
 * root layout so every page carries brand identity for search/answer
 * engines — not just the homepage. Kept deliberately factual: no ratings,
 * no pricing, nothing that isn't already published elsewhere on the site.
 */
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Torvault Safe Company",
    alternateName: "Torvault",
    url: SITE_URL,
    logo: `${SITE_URL}/icon-blue.png`,
    description:
      "Torvault engineers UL-rated fire and burglary safes — Fire & Burglary, TL-15, and TL-30 High Security lines — sold wholesale through authorized Canadian dealers.",
    foundingDate: "2026",
    parentOrganization: {
      "@type": "Organization",
      name: "Security Lock & Safe Inc.",
      sameAs: "https://torontosafes.ca/",
    },
    sameAs: ["https://torontosafes.ca/"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-877-887-5620",
        email: "info@torvaultsafe.com",
        contactType: "customer service",
        areaServed: "CA",
        availableLanguage: ["English", "French", "Chinese", "Italian"],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList structured data for any page. `trail` is the chain of
 * crumbs AFTER Home (which this always prepends), as
 * `{ name, path }` pairs where `path` is locale-agnostic (e.g. "/about").
 * Pass `path: null` for the current page's own crumb if it shouldn't link
 * anywhere (still fine to include per schema.org's BreadcrumbList).
 */
export function BreadcrumbJsonLd({
  locale,
  homeLabel,
  trail,
}: {
  locale: Locale;
  homeLabel: string;
  trail: { name: string; path: string | null }[];
}) {
  const items = [{ name: homeLabel, path: "/" as string | null }, ...trail];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path !== null ? { item: canonicalFor(locale, item.path) } : {}),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Torvault Safe Company",
    url: SITE_URL,
    inLanguage: locale,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
