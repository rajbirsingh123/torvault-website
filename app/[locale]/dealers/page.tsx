import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, getLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DealerApplicationForm from "@/components/DealerApplicationForm";
import CountUp from "@/components/CountUp";
import StepCarousel from "@/components/StepCarousel";
import { Link } from "@/i18n/navigation";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dealersPage" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/dealers",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/safe-tl30.jpg",
  });
}

export default async function DealersPage() {
  const t = await getTranslations("dealersPage");
  const tc = await getTranslations("productsCommon");
  const locale = await getLocale();

  const ONBOARDING_STEPS: { num: string; title: string; body: ReactNode }[] = [
    {
      num: "01",
      title: t("steps.step1Title"),
      body: (
        <>
          {t("steps.step1BodyPre")}{" "}
          <a href="mailto:dealers@torvaultsafe.com" style={{ textDecoration: "underline" }}>
            dealers@torvaultsafe.com
          </a>{" "}
          {t("steps.step1BodyPost")}
        </>
      ),
    },
    { num: "02", title: t("steps.step2Title"), body: t("steps.step2Body") },
    { num: "03", title: t("steps.step3Title"), body: t("steps.step3Body") },
    { num: "04", title: t("steps.step4Title"), body: t("steps.step4Body") },
  ];

  return (
    <main>
      <BreadcrumbJsonLd
        locale={locale as Locale}
        homeLabel={tc("home")}
        trail={[{ name: t("hero.eyebrow"), path: null }]}
      />
      <PageHero crumb={t("hero.crumb")} eyebrow={t("hero.eyebrow")} title={t("hero.title")}>
        {t("hero.body")}
      </PageHero>

      <div className="wrap" style={{ marginTop: -28, marginBottom: 28 }}>
        <p style={{ fontSize: 13.5 }}>
          {t("lookingToBuyPre")}{" "}
          <Link href="/find-a-dealer" style={{ textDecoration: "underline" }}>
            {t("lookingToBuyLink")}
          </Link>
        </p>
      </div>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("benefits.eyebrow")}</span>
            <h2>{t("benefits.heading")}</h2>
            <p>{t("benefits.body")}</p>
          </Reveal>
          <div className="icon-grid">
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 11l9-7 9 7" />
                  <path d="M5 10v10h14V10" />
                </svg>
              </span>
              <h4>{t("benefits.item1Title")}</h4>
              <p>{t("benefits.item1Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </span>
              <h4>{t("benefits.item2Title")}</h4>
              <p>{t("benefits.item2Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M1 4h13v11H1zM14 8h4l4 4v3h-8z" />
                  <circle cx="6" cy="18" r="1.8" />
                  <circle cx="17" cy="18" r="1.8" />
                </svg>
              </span>
              <h4>{t("benefits.item3Title")}</h4>
              <p>{t("benefits.item3Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
                </svg>
              </span>
              <h4>{t("benefits.item4Title")}</h4>
              <p>{t("benefits.item4Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="5.5" />
                  <path d="M8.5 12.5L7 21l5-2.5 5 2.5-1.5-8.5" />
                </svg>
              </span>
              <h4>{t("benefits.item5Title")}</h4>
              <p>{t("benefits.item5Body")}</p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M8 2v4M16 2v4M3 10h18" />
                </svg>
              </span>
              <h4>{t("benefits.item6Title")}</h4>
              <p>{t("benefits.item6Body")}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("steps.eyebrow")}</span>
            <h2>{t("steps.heading")}</h2>
          </Reveal>
          <StepCarousel steps={ONBOARDING_STEPS} />
        </div>
      </section>

      <section id="dealer" className="dealer">
        <div className="wrap dealer-grid">
          <div>
            <span className="eyebrow">{t("snapshot.eyebrow")}</span>
            <h2>{t("snapshot.heading")}</h2>
            <p>{t("snapshot.body")}</p>
            <a
              className="btn btn-primary"
              href="mailto:dealers@torvaultsafe.com?subject=Torvault%20Dealer%20Inquiry"
            >
              {t("snapshot.cta")}
            </a>
          </div>
          <div className="dealer-stats">
            <div className="dealer-stat">
              <div className="num"><CountUp value="3" /></div>
              <div className="lbl">{t("snapshot.stat1Label")}</div>
            </div>
            <div className="dealer-stat">
              <div className="num"><CountUp value={"TL‑30"} /></div>
              <div className="lbl">{t("snapshot.stat2Label")}</div>
            </div>
            <div className="dealer-stat">
              <div className="num"><CountUp value="CA" /></div>
              <div className="lbl">{t("snapshot.stat3Label")}</div>
            </div>
            <div className="dealer-stat">
              <div className="num"><CountUp value="01" /></div>
              <div className="lbl">{t("snapshot.stat4Label")}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-banner">
            <span
              className="eyebrow"
              style={{ justifyContent: "center", color: "var(--brass-600)" }}
            >
              {t("cta.eyebrow")}
            </span>
            <h2>{t("cta.heading")}</h2>
            <p>{t("cta.body")}</p>
            <DealerApplicationForm />
            <p className="form-note">
              {t("cta.formNotePre")}{" "}
              <Link href="/faq">{t("cta.formNoteLink")}</Link> {t("cta.formNotePost")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
