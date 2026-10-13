import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
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
  const t = await getTranslations({ locale, namespace: "supportPage" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/support",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/hero-safe.jpg",
  });
}

export default async function SupportPage() {
  const t = await getTranslations("supportPage");
  const tc = await getTranslations("productsCommon");
  const locale = await getLocale();

  const TOPICS = [
    {
      href: "/faq",
      title: t("topics.faqTitle"),
      body: t("topics.faqBody"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 014.6 1.4c0 1.6-2.1 1.9-2.1 3.3M12 17h.01" />
        </svg>
      ),
    },
    {
      href: "/blog/choosing-the-right-safe-size",
      title: t("topics.sizeTitle"),
      body: t("topics.sizeBody"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 20h16M6 20V9l6-5 6 5v11" />
          <path d="M10 20v-6h4v6" />
        </svg>
      ),
    },
    {
      href: "/blog/what-to-expect-at-delivery",
      title: t("topics.shippingTitle"),
      body: t("topics.shippingBody"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="1" y="7" width="13" height="10" rx="1" />
          <path d="M14 10h4l4 3.5V17h-8z" />
          <circle cx="6" cy="19" r="1.6" />
          <circle cx="17.5" cy="19" r="1.6" />
        </svg>
      ),
    },
    {
      href: "/blog",
      title: t("topics.vaultTitle"),
      body: t("topics.vaultBody"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 5a2 2 0 012-2h11a1 1 0 011 1v15a1 1 0 01-1 1H6a2 2 0 01-2-2V5z" />
          <path d="M4 18a2 2 0 002 2h11" />
        </svg>
      ),
    },
    {
      href: "/find-a-dealer",
      title: t("topics.dealerTitle"),
      body: t("topics.dealerBody"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
    },
    {
      href: "/contact",
      title: t("topics.contactTitle"),
      body: t("topics.contactBody"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 5h16v11H7l-3 3V5z" />
          <path d="M8 9h8M8 12.5h5" />
        </svg>
      ),
    },
  ];

  return (
    <main>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tc("home")}
        trail={[{ name: t("hero.eyebrow"), path: null }]}
      />
      <PageHero crumb={t("hero.crumb")} eyebrow={t("hero.eyebrow")} title={t("hero.title")}>
        {t("hero.bodyPre")}{" "}
        <Link href="/contact" style={{ color: "#fff", textDecoration: "underline" }}>
          {t("hero.contactLink")}
        </Link>{" "}
        {t("hero.bodyPost")}
      </PageHero>

      <section>
        <div className="wrap">
          <div className="icon-grid">
            {TOPICS.map((topic, i) => (
              <Reveal key={topic.href} delay={i * 60}>
                <Link href={topic.href} className="icon-item icon-item-link">
                  <span className="ico">{topic.icon}</span>
                  <h4>{topic.title}</h4>
                  <p>{topic.body}</p>
                </Link>
              </Reveal>
            ))}
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
              {t("stillNeedHelp.eyebrow")}
            </span>
            <h2>{t("stillNeedHelp.heading")}</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>{t("stillNeedHelp.body")}</p>
          </Reveal>
          <div style={{ textAlign: "center" }}>
            <Link className="btn btn-grad" href="/contact">
              {t("stillNeedHelp.cta")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
