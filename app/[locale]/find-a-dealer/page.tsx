import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DealerLocator from "@/components/DealerLocator";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { dealers } from "@/lib/dealers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "findADealerPage" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/find-a-dealer",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/hero-safe.jpg",
  });
}

export default async function FindADealerPage() {
  const t = await getTranslations("findADealerPage");

  // Real, published listing data for the one dealer currently onboarded
  // (Toronto Safes) — geographic/local-business signal for map and local
  // search surfaces, built only from facts already shown on this page.
  const dealerSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: dealers.map((dealer, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "HardwareStore",
        name: dealer.name,
        description: dealer.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: dealer.address,
          addressLocality: dealer.city,
          addressRegion: dealer.province,
          postalCode: dealer.postalCode,
          addressCountry: "CA",
        },
        geo: { "@type": "GeoCoordinates", latitude: dealer.lat, longitude: dealer.lon },
        telephone: dealer.phone,
        email: dealer.email,
        url: dealer.website,
        ...(dealer.rating !== undefined && dealer.reviewCount !== undefined
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: dealer.rating,
                reviewCount: dealer.reviewCount,
              },
            }
          : {}),
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerSchema) }}
      />
      <PageHero
        crumb={t("hero.crumb")}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
      >
        {t("hero.body")}
      </PageHero>

      <section>
        <div className="wrap">
          <Reveal>
            <DealerLocator />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap about-grid">
          <Reveal className="about-copy">
            <span className="eyebrow" style={{ color: "var(--brass-600)" }}>
              {t("notInArea.eyebrow")}
            </span>
            <h2>{t("notInArea.heading")}</h2>
            <p>{t("notInArea.body")}</p>
            <p>
              <Link className="cat-cta" href="/dealers">
                {t("notInArea.cta")}
              </Link>
            </p>
          </Reveal>
          <Reveal className="about-copy" delay={100}>
            <span className="eyebrow" style={{ color: "var(--brass-600)" }}>
              {t("areYouRetailer.eyebrow")}
            </span>
            <h2>{t("areYouRetailer.heading")}</h2>
            <p>{t("areYouRetailer.body")}</p>
            <p>
              <a
                className="cat-cta"
                href="mailto:dealers@torvaultsafe.com?subject=Torvault%20Dealer%20Inquiry"
              >
                {t("areYouRetailer.cta")}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
