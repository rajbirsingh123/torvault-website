import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import FaqAccordion, { FaqEntry } from "@/components/FaqAccordion";
import { interpolateNodes } from "@/lib/richText";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/faq",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/hero-safe.jpg",
  });
}

export default async function FaqPage() {
  const t = await getTranslations("faqPage");
  const tc = await getTranslations("productsCommon");
  const locale = await getLocale();

  const plainAnswer = (raw: string, links: Record<string, string>) =>
    raw.replace(/\{([a-zA-Z0-9]+)\}/g, (_, key) => links[key] ?? "");

  const generalFaqs: FaqEntry[] = [
    { question: t("general.q1"), answer: t("general.a1") },
    {
      question: t("general.q2"),
      answer: interpolateNodes(t.raw("general.a2") as string, {
        aboutLink: (
          <Link href="/about" style={{ textDecoration: "underline" }}>
            {t("general.a2LinkText")}
          </Link>
        ),
      }),
    },
    {
      question: t("general.q3"),
      answer: (
        <>
          {t("general.a3Pre")} <em>{t("general.a3Em1")}</em> {t("general.a3Mid")}{" "}
          <em>{t("general.a3Em2")}</em>
          {t("general.a3Post")}
        </>
      ),
    },
  ];

  const ratingFaqs: FaqEntry[] = [
    {
      question: t("ratings.q1"),
      answer: interpolateNodes(t.raw("ratings.a1") as string, {
        certifiedStandardLink: (
          <Link href="/certified-standard" style={{ textDecoration: "underline" }}>
            {t("ratings.a1LinkText")}
          </Link>
        ),
      }),
    },
    { question: t("ratings.q2"), answer: t("ratings.a2") },
  ];

  const orderingFaqs: FaqEntry[] = [
    {
      question: t("ordering.q1"),
      answer: interpolateNodes(t.raw("ordering.a1") as string, {
        torontoSafesLink: (
          <a href="https://torontosafes.ca/" target="_blank" rel="noopener" style={{ textDecoration: "underline" }}>
            Toronto Safes
          </a>
        ),
      }),
    },
    {
      question: t("ordering.q2"),
      answer: interpolateNodes(t.raw("ordering.a2") as string, {
        dealerProgramLink: (
          <Link href="/dealers" style={{ textDecoration: "underline" }}>
            {t("ordering.a2LinkText")}
          </Link>
        ),
      }),
    },
    {
      question: t("ordering.q3"),
      answer: interpolateNodes(t.raw("ordering.a3") as string, {
        email: (
          <a href="mailto:dealers@torvaultsafe.com" style={{ textDecoration: "underline" }}>
            dealers@torvaultsafe.com
          </a>
        ),
        dealerProgramLink: (
          <Link href="/dealers" style={{ textDecoration: "underline" }}>
            {t("ordering.a2LinkText")}
          </Link>
        ),
      }),
    },
    { question: t("ordering.q4"), answer: t("ordering.a4") },
  ];

  // Flat, plain-text Q&A list for FAQPage structured data — the richest
  // single page on the site for answer-engine citation, so every question
  // across all three groups is included, not just a sample.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { q: t("general.q1"), a: t("general.a1") },
      {
        q: t("general.q2"),
        a: plainAnswer(t.raw("general.a2") as string, { aboutLink: t("general.a2LinkText") }),
      },
      {
        q: t("general.q3"),
        a: `${t("general.a3Pre")} ${t("general.a3Em1")} ${t("general.a3Mid")} ${t("general.a3Em2")}${t("general.a3Post")}`,
      },
      {
        q: t("ratings.q1"),
        a: plainAnswer(t.raw("ratings.a1") as string, { certifiedStandardLink: t("ratings.a1LinkText") }),
      },
      { q: t("ratings.q2"), a: t("ratings.a2") },
      {
        q: t("ordering.q1"),
        a: plainAnswer(t.raw("ordering.a1") as string, { torontoSafesLink: "Toronto Safes" }),
      },
      {
        q: t("ordering.q2"),
        a: plainAnswer(t.raw("ordering.a2") as string, { dealerProgramLink: t("ordering.a2LinkText") }),
      },
      {
        q: t("ordering.q3"),
        a: plainAnswer(t.raw("ordering.a3") as string, {
          email: "dealers@torvaultsafe.com",
          dealerProgramLink: t("ordering.a2LinkText"),
        }),
      },
      { q: t("ordering.q4"), a: t("ordering.a4") },
    ].map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

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
        {t("hero.bodyPre")}{" "}
        <a href="mailto:info@torvaultsafe.com" style={{ color: "#fff", textDecoration: "underline" }}>
          info@torvaultsafe.com
        </a>
        .
      </PageHero>

      <section>
        <div className="wrap">
          <p className="faq-group-label">{t("groupGeneral")}</p>
          <FaqAccordion items={generalFaqs} />

          <p className="faq-group-label">{t("groupRatings")}</p>
          <FaqAccordion items={ratingFaqs} />

          <p className="faq-group-label">{t("groupOrdering")}</p>
          <FaqAccordion items={orderingFaqs} />
        </div>
      </section>
    </main>
  );
}
