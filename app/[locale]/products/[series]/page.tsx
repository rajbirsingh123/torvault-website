import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import FaqAccordion from "@/components/FaqAccordion";
import ModelLineup from "@/components/ModelLineup";
import ProductBuyBox from "@/components/ProductBuyBox";
import Button from "@/components/Button";
import ProductPdpGallery from "@/components/ProductPdpGallery";
import {
  SERIES_STRUCTURAL,
  SERIES_LIST,
  modelsBySeries,
  seriesSizeRange,
  type SafeSeries,
} from "@/lib/safes";
import { getSeriesContent } from "@/lib/safes-i18n";
import { buildMetadata, canonicalFor } from "@/lib/seo";
import { SITE_URL } from "@/lib/nav";
import type { Locale } from "@/i18n/routing";

type Params = { series: string; locale: string };

export function generateStaticParams() {
  return SERIES_LIST.map((series) => ({ series }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { series, locale } = await params;
  if (!SERIES_STRUCTURAL[series as SafeSeries]) return {};
  const tp = await getTranslations({ locale, namespace: "products" });
  const content = getSeriesContent(tp, series as SafeSeries);

  return buildMetadata({
    locale: locale as Locale,
    pathname: `/products/${content.slug}`,
    title: `${content.label} Safes | Torvault Safe Company`,
    description: content.metaDescription,
    image: content.image,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { series, locale } = await params;
  if (!SERIES_STRUCTURAL[series as SafeSeries]) notFound();
  const tp = await getTranslations("products");
  const t = await getTranslations("productDetailPage");
  const tc = await getTranslations("productsCommon");
  const tcommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const tListing = await getTranslations("productsPage");
  const content = getSeriesContent(tp, series as SafeSeries);

  const models = modelsBySeries(content.series);
  const range = seriesSizeRange(content.series);
  const otherSeries = SERIES_LIST.filter((s) => s !== content.series);

  const pageUrl = canonicalFor(locale as Locale, `/products/${content.slug}`);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Torvault ${content.label}`,
    description: content.metaDescription,
    image: `${SITE_URL}${content.image}`,
    url: pageUrl,
    brand: { "@type": "Brand", name: "Torvault Safe Company" },
    category: "Safes",
    manufacturer: { "@type": "Organization", name: "Torvault Safe Company" },
    additionalProperty: content.specCells.map((cell) => ({
      "@type": "PropertyValue",
      name: cell.k,
      value: cell.v,
    })),
    // No `offers`/price block: Torvault sells wholesale-only through
    // dealers with no published pricing, and an Offer without a price is
    // an invalid/incomplete structured-data field per Google's guidelines
    // — omitting it entirely is more correct than faking one.
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tc("home"), item: canonicalFor(locale as Locale, "/") },
      { "@type": "ListItem", position: 2, name: tNav("products"), item: canonicalFor(locale as Locale, "/products") },
      { "@type": "ListItem", position: 3, name: content.label, item: pageUrl },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pdp-crumb-bar">
        <div className="wrap breadcrumb">
          <Link href="/">{tc("home")}</Link>
          <span>/</span>
          <Link href="/products">{tNav("products")}</Link>
          <span>/</span>
          <span>{content.label}</span>
        </div>
      </div>

      <section className="pdp-hero">
        <div className="wrap">
          <div className="detail-row has-gallery">
            <ProductPdpGallery slug={content.slug} label={content.label} />
            <div className="detail-copy">
              <div className="chip-row">
                {content.chips.map((chip) => (
                  <span className="chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
              <h1>{content.label}</h1>
              <p>{content.intro[0]}</p>
              <ProductBuyBox models={models} seriesLabel={content.label} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("overviewEyebrow")}</span>
            <h2>{t("overviewHeading")}</h2>
          </Reveal>
          {content.intro.slice(1).map((paragraph, i) => (
            <p key={i} style={{ maxWidth: "70ch", marginTop: i === 0 ? 0 : 14 }}>
              {paragraph}
            </p>
          ))}
          <div className="detail-specs" style={{ marginTop: 28 }}>
            {content.specCells.map((cell) => (
              <div className="cell" key={cell.k}>
                <div className="v">{cell.v}</div>
                <div className="k">{cell.k}</div>
              </div>
            ))}
          </div>
          <div className="detail-use">
            <strong>{tcommon("bestForLabel")}</strong> {content.bestFor}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("keyFeaturesEyebrow")}</span>
            <h2>{t("keyFeaturesHeading")}</h2>
          </Reveal>
          <ul className="feature-list pdp-feature-grid">
            {content.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="spec-head">
            <div>
              <span className="eyebrow">{t("fullLineupEyebrow")}</span>
              <h3>{t("sizesBuiltToOrder", { count: models.length })}</h3>
              <p>{t("sortDescription", { label: content.label })}</p>
            </div>
            <div className="spec-stats">
              <span className="spec-stat">
                <strong>{models.length}</strong> {t("modelsLabel")}
              </span>
              <span className="spec-stat">
                <strong>
                  {range.min.toLocaleString()}&ndash;{range.max.toLocaleString()}
                </strong>{" "}
                {t("lbsRangeLabel")}
              </span>
            </div>
          </div>
          <ModelLineup models={models} seriesLabel={content.label} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("exploreLineEyebrow")}</span>
            <h2>{t("exploreLineHeading")}</h2>
          </Reveal>
          <div className="cat-grid">
            {otherSeries.map((s, i) => {
              const other = getSeriesContent(tp, s);
              return (
                <TiltCard key={s}>
                  <Reveal as="article" className="cat-card" delay={i * 100}>
                    <div className="cat-visual">
                      <span className="cat-badge">{other.badge}</span>
                      <Image
                        src={other.image}
                        alt={other.imageAlt}
                        width={900}
                        height={506}
                        style={{ width: "100%", height: 230, objectFit: "cover" }}
                      />
                    </div>
                    <div className="cat-body">
                      <span className="cat-rating">{other.chips[0]}</span>
                      <h3>{other.label}</h3>
                      <p>{other.intro[0].slice(0, 118)}&hellip;</p>
                      <div className="cat-specs">
                        {other.specCells.slice(0, 3).map((cell) => (
                          <div className="row" key={cell.k}>
                            <span>{cell.k}</span>
                            <span>{cell.v}</span>
                          </div>
                        ))}
                      </div>
                      <span className="cat-cta" aria-hidden="true">
                        {t("viewProduct")}
                      </span>
                    </div>
                    <Link
                      className="cat-card-link"
                      href={`/products/${other.slug}`}
                      aria-label={tListing("viewProductDetailsAria", { label: other.label })}
                    />
                  </Reveal>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("faqEyebrow")}</span>
            <h2>{t("faqHeading", { label: content.label })}</h2>
          </Reveal>
          <FaqAccordion items={content.faqs} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal
            className="section-head"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              {tc("notSureEyebrow")}
            </span>
            <h2>{tc("notSureHeading")}</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>{tc("notSureBody")}</p>
          </Reveal>
          <div style={{ textAlign: "center" }}>
            <Button href="/dealers" variant="primary">
              {tc("requestDealerPackage")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
