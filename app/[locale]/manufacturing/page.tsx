import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import ManufacturingStory from "@/components/ManufacturingStory";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "manufacturing" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/manufacturing",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/hero-safe.jpg",
  });
}

export default async function ManufacturingPage() {
  const t = await getTranslations("manufacturing");
  const tc = await getTranslations("productsCommon");
  const locale = await getLocale();
  return (
    <main>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tc("home")}
        trail={[{ name: t("hero.eyebrow"), path: null }]}
      />
      <PageHero
        crumb={t("hero.crumb")}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
      >
        {t("hero.body")}
      </PageHero>

      <ManufacturingStory />

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("commitments.eyebrow")}</span>
            <h2>{t("commitments.heading")}</h2>
          </Reveal>
          <div className="icon-grid">
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
                </svg>
              </span>
              <h4>{t("commitments.item1Title")}</h4>
              <p>{t("commitments.item1Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </span>
              <h4>{t("commitments.item2Title")}</h4>
              <p>{t("commitments.item2Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 13v-1a8 8 0 0116 0v1" />
                  <rect x="2.5" y="13" width="4" height="6" rx="1.4" />
                  <rect x="17.5" y="13" width="4" height="6" rx="1.4" />
                  <path d="M20 19v1a3 3 0 01-3 3h-3" />
                </svg>
              </span>
              <h4>{t("commitments.item3Title")}</h4>
              <p>{t("commitments.item3Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="5.5" />
                  <path d="M8.5 12.5L7 21l5-2.5 5 2.5-1.5-8.5" />
                </svg>
              </span>
              <h4>{t("commitments.item4Title")}</h4>
              <p>{t("commitments.item4Body")}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="callout" style={{ maxWidth: 820, margin: "0 auto" }}>
            <strong>{t("callout.strong")}</strong> {t("callout.body")}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal
            className="section-head"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              {t("nextStep.eyebrow")}
            </span>
            <h2>{t("nextStep.heading")}</h2>
          </Reveal>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              className="btn btn-primary"
              style={{ background: "var(--navy-950)", color: "#fff" }}
              href="/certified-standard"
            >
              {t("nextStep.certifiedCta")}
            </Link>
            <Link
              className="btn"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
              href="/products"
            >
              {t("nextStep.productsCta")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
