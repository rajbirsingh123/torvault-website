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
  const t = await getTranslations({ locale, namespace: "certifiedStandard" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/certified-standard",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/safe-tl30.jpg",
  });
}

export default async function CertifiedStandardPage() {
  const t = await getTranslations("certifiedStandard");
  const tc = await getTranslations("productsCommon");
  const locale = await getLocale();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { q: `What is ${t("terms.entryTitle")}?`, a: t("terms.entryBody") },
      { q: `What is ${t("terms.tl15Title")}?`, a: t("terms.tl15Body") },
      { q: `What is ${t("terms.tl30Title")}?`, a: t("terms.tl30Body") },
      { q: t("ulTesting.heading"), a: `${t("ulTesting.bodyPre")} ${t("ulTesting.bodyStrong")}${t("ulTesting.bodyPost")}` },
      { q: t("fireTesting.heading"), a: t("fireTesting.body") },
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
        {t("hero.body")}
      </PageHero>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("ulTesting.eyebrow")}</span>
            <h2>{t("ulTesting.heading")}</h2>
            <p>
              {t("ulTesting.bodyPre")}{" "}
              <strong style={{ color: "var(--text)" }}>{t("ulTesting.bodyStrong")}</strong>
              {t("ulTesting.bodyPost")}
            </p>
          </Reveal>

          <div className="term-grid">
            <div className="term-card" id="entry">
              <span className="term-label">{t("terms.entryLabel")}</span>
              <h3>{t("terms.entryTitle")}</h3>
              <p>{t("terms.entryBody")}</p>
              <ul>
                <li>{t("terms.entryLi1")}</li>
                <li>{t("terms.entryLi2")}</li>
                <li>{t("terms.entryLi3")}</li>
                <li>{t("terms.entryLi4")}</li>
              </ul>
            </div>
            <div className="term-card" id="tl-15">
              <span className="term-label">{t("terms.tl15Label")}</span>
              <h3>{t("terms.tl15Title")}</h3>
              <p>{t("terms.tl15Body")}</p>
              <ul>
                <li>{t("terms.tl15Li1")}</li>
                <li>{t("terms.tl15Li2")}</li>
                <li>{t("terms.tl15Li3")}</li>
                <li>{t("terms.tl15Li4")}</li>
              </ul>
            </div>
            <div className="term-card" id="tl-30">
              <span className="term-label">{t("terms.tl30Label")}</span>
              <h3>{t("terms.tl30Title")}</h3>
              <p>{t("terms.tl30Body")}</p>
              <ul>
                <li>{t("terms.tl30Li1")}</li>
                <li>{t("terms.tl30Li2")}</li>
                <li>{t("terms.tl30Li3")}</li>
                <li>{t("terms.tl30Li4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="fire">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("fireTesting.eyebrow")}</span>
            <h2>{t("fireTesting.heading")}</h2>
            <p>{t("fireTesting.body")}</p>
          </Reveal>
          <div className="icon-grid">
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2c2 4-2 5-2 8a2 2 0 004 0c1 2 0 4-2 6-3-1-5-4-5-7 0-3 2-5 5-7z" />
                </svg>
              </span>
              <h4>{t("fireTesting.class350Title")}</h4>
              <p>{t("fireTesting.class350Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2c2 4-2 5-2 8a2 2 0 004 0c1 2 0 4-2 6-3-1-5-4-5-7 0-3 2-5 5-7z" />
                </svg>
              </span>
              <h4>{t("fireTesting.class150Title")}</h4>
              <p>{t("fireTesting.class150Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2c2 4-2 5-2 8a2 2 0 004 0c1 2 0 4-2 6-3-1-5-4-5-7 0-3 2-5 5-7z" />
                </svg>
              </span>
              <h4>{t("fireTesting.class125Title")}</h4>
              <p>{t("fireTesting.class125Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </span>
              <h4>{t("fireTesting.durationTitle")}</h4>
              <p>
                {t("fireTesting.durationBodyPre")}{" "}
                <strong style={{ color: "var(--text)" }}>{t("fireTesting.durationBodyStrong")}</strong>{" "}
                {t("fireTesting.durationBodyPost")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("table.eyebrow")}</span>
            <h2>{t("table.heading")}</h2>
          </Reveal>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">{t("table.colProductLine")}</th>
                  <th scope="col">{t("table.colRating")}</th>
                  <th scope="col">{t("table.colNetWorkingTime")}</th>
                  <th scope="col">{t("table.colToolsResisted")}</th>
                  <th scope="col">{t("table.colFireEndurance")}</th>
                  <th scope="col">{t("table.colSteelBody")}</th>
                  <th scope="col">{t("table.colTypicalUse")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{t("table.fireBurglaryRow")}</th>
                  <td>{t("terms.entryTitle")}</td>
                  <td>{t("terms.entryLi1")}</td>
                  <td>{t("table.fireBurglaryTools")}</td>
                  <td>1&#8211;Hr @ 350&deg;F</td>
                  <td>12 ga steel</td>
                  <td>{t("table.fireBurglaryUse")}</td>
                </tr>
                <tr>
                  <th scope="row">TL&#8209;15</th>
                  <td>{t("terms.tl15Title")}</td>
                  <td>{t("terms.tl15Li1")}</td>
                  <td>{t("table.tl15Tools")}</td>
                  <td>2&#8211;Hr @ 350&deg;F</td>
                  <td>1&Prime; solid steel</td>
                  <td>{t("table.tl15Use")}</td>
                </tr>
                <tr>
                  <th scope="row">TL&#8209;30</th>
                  <td>{t("terms.tl30Title")}</td>
                  <td>{t("terms.tl30Li1")}</td>
                  <td>{t("table.tl30Tools")}</td>
                  <td>2&#8211;Hr @ 350&deg;F</td>
                  <td>1.5&Prime; solid steel</td>
                  <td>{t("table.tl30Use")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="callout">
            <strong>{t("insuranceCallout.strong")}</strong> {t("insuranceCallout.body")}
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
              href="/products"
            >
              {t("nextStep.productsCta")}
            </Link>
            <Link
              className="btn"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
              href="/faq"
            >
              {t("nextStep.faqCta")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
