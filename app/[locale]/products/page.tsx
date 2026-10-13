import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";
import { Link } from "@/i18n/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import PageHero from "@/components/PageHero";
import ProductSearch from "@/components/ProductSearch";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import FaqAccordion from "@/components/FaqAccordion";
import { SERIES_LIST, modelsBySeries, seriesSizeRange } from "@/lib/safes";
import { getSeriesContent } from "@/lib/safes-i18n";
import { interpolateNodes } from "@/lib/richText";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "productsPage" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/products",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/safe-tl30.jpg",
  });
}

function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const cut = text.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxChars).trimEnd()}…`;
}

export default async function ProductsPage() {
  const tp = await getTranslations("products");
  const t = await getTranslations("productsPage");
  const tc = await getTranslations("productsCommon");
  const tcommon = await getTranslations("common");
  const tHome = await getTranslations("home");
  const locale = await getLocale();

  const plainAnswer = (raw: string, links: Record<string, string>) =>
    raw.replace(/\{([a-zA-Z0-9]+)\}/g, (_, key) => links[key] ?? "");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        q: tHome("faqSection.q1"),
        a: plainAnswer(tHome.raw("faqSection.a1") as string, {
          certifiedStandardLink: tHome("faqSection.a1LinkText"),
        }),
      },
      { q: tHome("faqSection.q4"), a: tHome("faqSection.a4") },
      { q: tHome("faqSection.q5"), a: tHome("faqSection.a5") },
    ].map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const productFaqs = [
    {
      question: tHome("faqSection.q1"),
      answer: interpolateNodes(tHome.raw("faqSection.a1") as string, {
        certifiedStandardLink: (
          <Link href="/certified-standard" style={{ textDecoration: "underline" }}>
            {tHome("faqSection.a1LinkText")}
          </Link>
        ),
      }),
    },
    { question: tHome("faqSection.q4"), answer: tHome("faqSection.a4") },
    { question: tHome("faqSection.q5"), answer: tHome("faqSection.a5") },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tc("home")}
        trail={[{ name: t("hero.eyebrow"), path: null }]}
      />
      <PageHero crumb={t("hero.crumb")} eyebrow={t("hero.eyebrow")} title={t("hero.title")}>
        {t("hero.body")}
      </PageHero>

      <section>
        <div className="wrap">
          <ProductSearch />
          <div className="cat-grid">
            {SERIES_LIST.map((series, i) => {
              const content = getSeriesContent(tp, series);
              const range = seriesSizeRange(series);
              const modelCount = modelsBySeries(series).length;
              return (
                <TiltCard key={series}>
                  <Reveal as="article" className="cat-card" delay={i * 100}>
                    <div className="cat-visual">
                      <span className="cat-badge">{content.badge}</span>
                      <FavoriteButton
                        slug={content.slug}
                        label={content.label}
                        className="cat-visual-favorite"
                      />
                      <Image
                        src={content.image}
                        alt={content.imageAlt}
                        width={900}
                        height={506}
                        style={{ width: "100%", height: 230, objectFit: "cover" }}
                      />
                    </div>
                    <div className="cat-body">
                      <span className="cat-rating">{content.chips[0]}</span>
                      <h3>{content.label}</h3>
                      <p>{truncate(content.intro[0], 150)}</p>
                      <p className="cat-fit">
                        <strong>{tcommon("bestForLabel")}</strong> {truncate(content.bestFor, 110)}
                      </p>
                      <div className="cat-specs">
                        {content.specCells.slice(0, 3).map((cell) => (
                          <div className="row" key={cell.k}>
                            <span>{cell.k}</span>
                            <span>{cell.v}</span>
                          </div>
                        ))}
                        <div className="row">
                          <span>{t("sizesLabel")}</span>
                          <span>
                            {modelCount} &middot; {range.min.toLocaleString()}&ndash;
                            {range.max.toLocaleString()} lbs
                          </span>
                        </div>
                      </div>
                      <span className="cat-cta" aria-hidden="true">
                        {t("viewProductFullSpecs")}
                      </span>
                    </div>
                    <Link
                      className="cat-card-link"
                      href={`/products/${content.slug}`}
                      aria-label={t("viewProductDetailsAria", { label: content.label })}
                    />
                  </Reveal>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("sideBySide.eyebrow")}</span>
            <h2>{t("sideBySide.heading")}</h2>
            <p>
              {t("sideBySide.bodyPre")}{" "}
              <Link href="/certified-standard" style={{ textDecoration: "underline" }}>
                {t("sideBySide.certifiedStandardLinkText")}
              </Link>{" "}
              {t("sideBySide.bodyPost")}
            </p>
          </Reveal>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">{t("table.colProductLine")}</th>
                  <th scope="col">{t("table.colRating")}</th>
                  <th scope="col">{t("table.colNetWorkingTime")}</th>
                  <th scope="col">{t("table.colFireEndurance")}</th>
                  <th scope="col">{t("table.colSteelBody")}</th>
                  <th scope="col">{t("table.colDoor")}</th>
                  <th scope="col">{t("table.colRelocking")}</th>
                  <th scope="col">{t("table.colTypicalUse")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <Link href="/products/fire-burglary" className="table-row-link">
                      Fire &amp; Burglary
                    </Link>
                  </th>
                  <td>{t("table.row1Rating")}</td>
                  <td>{t("table.row1Net")}</td>
                  <td>1&#8211;Hr @ 350&deg;F</td>
                  <td>{t("table.row1Steel")}</td>
                  <td>{t("table.row1Door")}</td>
                  <td>&mdash;</td>
                  <td>{t("table.row1Use")}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <Link href="/products/tl15" className="table-row-link">
                      TL&#8209;15
                    </Link>
                  </th>
                  <td>{t("table.row2Rating")}</td>
                  <td>{t("table.row2Net")}</td>
                  <td>&mdash;</td>
                  <td>{t("table.row2Steel")}</td>
                  <td>{t("table.row2Door")}</td>
                  <td>{t("table.row2Relocking")}</td>
                  <td>{t("table.row2Use")}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <Link href="/products/tl30" className="table-row-link">
                      TL&#8209;30
                    </Link>
                  </th>
                  <td>{t("table.row3Rating")}</td>
                  <td>{t("table.row3Net")}</td>
                  <td>&mdash;</td>
                  <td>{t("table.row3Steel")}</td>
                  <td>{t("table.row3Door")}</td>
                  <td>{t("table.row3Relocking")}</td>
                  <td>{t("table.row3Use")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <Reveal
            className="section-head"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              {t("faqEyebrow")}
            </span>
            <h2>{t("faqHeading")}</h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={productFaqs} />
          </Reveal>
          <p style={{ textAlign: "center", marginTop: 36 }}>
            <Link className="cat-cta" href="/faq">
              {tHome("faqSection.viewAll")}
            </Link>
          </p>
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
            <Link
              className="btn btn-primary"
              style={{ background: "var(--navy-950)", color: "#fff" }}
              href="/dealers"
            >
              {tc("requestDealerPackage")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
