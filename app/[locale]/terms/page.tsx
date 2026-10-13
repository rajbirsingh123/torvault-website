import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termsPage" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/terms",
    title: t("meta.title"),
    description: t("meta.description"),
    noIndex: true,
  });
}

export default async function TermsPage() {
  const t = await getTranslations("termsPage");
  return (
    <main>
      <PageHero crumb={t("hero.crumb")} eyebrow={t("hero.eyebrow")} title={t("hero.title")}>
        {t("hero.bodyPre")}{" "}
        <a href="mailto:info@torvaultsafe.com" style={{ color: "#fff", textDecoration: "underline" }}>
          info@torvaultsafe.com
        </a>
        .
      </PageHero>

      <section>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="about-copy">
            <h3>{t("s1Title")}</h3>
            <p>{t("s1Body")}</p>

            <h3>{t("s2Title")}</h3>
            <p>
              {t("s2BodyPre")}{" "}
              <Link href="/dealers" style={{ textDecoration: "underline" }}>
                {t("s2DealerProgram")}
              </Link>{" "}
              {t("s2And")}{" "}
              <Link href="/find-a-dealer" style={{ textDecoration: "underline" }}>
                {t("s2FindDealer")}
              </Link>{" "}
              {t("s2Post")}
            </p>

            <h3>{t("s3Title")}</h3>
            <p>
              {t("s3Body")}{" "}
              <a href="mailto:info@torvaultsafe.com" style={{ textDecoration: "underline" }}>
                info@torvaultsafe.com
              </a>
              .
            </p>

            <h3>{t("s4Title")}</h3>
            <p>
              {t("s4BodyPre")} <strong>{t("s4Help")}</strong> {t("s4ForHelpOr")}{" "}
              <strong>{t("s4Stop")}</strong> {t("s4Post")}
            </p>

            <h3>{t("s5Title")}</h3>
            <p>
              {t("s5Body")}{" "}
              <a href="mailto:info@torvaultsafe.com" style={{ textDecoration: "underline" }}>
                info@torvaultsafe.com
              </a>
              .
            </p>

            <h3>{t("s6Title")}</h3>
            <p>{t("s6Body")}</p>

            <h3>{t("s7Title")}</h3>
            <p>
              {t("s7BodyPre")}{" "}
              <a href="mailto:info@torvaultsafe.com" style={{ textDecoration: "underline" }}>
                info@torvaultsafe.com
              </a>{" "}
              {t("s7Or")}{" "}
              <a href="tel:+18778875620" style={{ textDecoration: "underline" }}>
                1-877-887-5620
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
