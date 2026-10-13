import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/contact",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/hero-safe.jpg",
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contactPage");
  const tc = await getTranslations("productsCommon");
  const locale = await getLocale();
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

      <section>
        <div className="wrap">
          <div className="contact-grid">
            <Reveal className="contact-card">
              <h3>{t("cards.generalTitle")}</h3>
              <p>{t("cards.generalBody")}</p>
              <div className="contact-card-links">
                <a href="mailto:info@torvaultsafe.com">info@torvaultsafe.com</a>
                <a href="tel:+18778875620">1-877-887-5620</a>
              </div>
            </Reveal>

            <Reveal className="contact-card" delay={60}>
              <h3>{t("cards.dealerTitle")}</h3>
              <p>{t("cards.dealerBody")}</p>
              <div className="contact-card-links">
                <a href="mailto:dealers@torvaultsafe.com?subject=Torvault%20Dealer%20Inquiry">
                  dealers@torvaultsafe.com
                </a>
                <Link href="/dealers">{t("cards.dealerLink")}</Link>
              </div>
            </Reveal>

            <Reveal className="contact-card" delay={120}>
              <h3>{t("cards.quoteTitle")}</h3>
              <p>{t("cards.quoteBody")}</p>
              <div className="contact-card-links">
                <Link href="/find-a-dealer">{t("cards.quoteLink")}</Link>
              </div>
            </Reveal>

            <Reveal className="contact-card" delay={180}>
              <h3>{t("cards.existingTitle")}</h3>
              <p>{t("cards.existingBody")}</p>
              <div className="contact-card-links">
                <a href="mailto:Sales@TorontoSafes.ca">Sales@TorontoSafes.ca</a>
                <a href="https://torontosafes.ca/" target="_blank" rel="noopener">
                  {t("cards.existingLink")}
                </a>
              </div>
            </Reveal>
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
              {t("formSection.eyebrow")}
            </span>
            <h2>{t("formSection.heading")}</h2>
          </Reveal>
          <ContactForm />
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="callout" style={{ maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            <strong>{t("callout.strong")}</strong> {t("callout.bodyPre")}{" "}
            <Link href="/support" style={{ textDecoration: "underline" }}>
              {t("callout.helpCenter")}
            </Link>{" "}
            {t("callout.and")}{" "}
            <Link href="/faq" style={{ textDecoration: "underline" }}>
              FAQ
            </Link>
            .
          </Reveal>
        </div>
      </section>
    </main>
  );
}
