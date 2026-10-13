import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AboutMediaScroll from "@/components/AboutMediaScroll";
import { formatBlogDate } from "@/lib/blog";
import { getAllBlogPosts } from "@/lib/blog-i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/about",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/safe-tl30.jpg",
  });
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tBlog = await getTranslations("blog");
  const tc = await getTranslations("productsCommon");
  const locale = await getLocale();
  const posts = getAllBlogPosts(tBlog).slice(0, 3);

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
        <div className="wrap about-grid">
          <div className="about-media">
            <AboutMediaScroll />
          </div>
          <div className="about-copy">
            <span className="eyebrow" style={{ color: "var(--brass-600)" }}>
              {t("story.eyebrow")}
            </span>
            <h2>{t("story.heading")}</h2>
            <p>{t("story.p1")}</p>
            <p>{t("story.p2")}</p>
            <p>{t("story.p3")}</p>
            <p>{t("story.p4")}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("timeline.eyebrow")}</span>
            <h2>{t("timeline.heading")}</h2>
          </Reveal>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-year">{t("timeline.item1Year")}</span>
              <div>
                <h3>{t("timeline.item1Title")}</h3>
                <p>{t("timeline.item1Body")}</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">{t("timeline.item2Year")}</span>
              <div>
                <h3>{t("timeline.item2Title")}</h3>
                <p>{t("timeline.item2Body")}</p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">{t("timeline.item3Year")}</span>
              <div>
                <h3>{t("timeline.item3Title")}</h3>
                <p>{t("timeline.item3Body")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("guides.eyebrow")}</span>
            <h2>{t("guides.heading")}</h2>
          </Reveal>
          <div className="blog-grid">
            {posts.map((post, i) => (
              <Reveal as="article" className="blog-card" delay={i * 80} key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="blog-card-link" aria-label={post.title}>
                  <span className="blog-card-media">
                    <Image
                      src={post.thumbnail}
                      alt={post.thumbnailAlt}
                      fill
                      sizes="(max-width: 860px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </span>
                  <span className="blog-card-body">
                    <span className="blog-card-meta">
                      <span className="blog-card-category">{post.category}</span>
                      <span>{formatBlogDate(post.date)}</span>
                    </span>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span className="blog-card-cta" aria-hidden="true">
                      {tBlog("readTheGuide")}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 36 }}>
            <Link className="cat-cta" href="/blog">
              {t("guides.viewAll")}
            </Link>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="callout" style={{ maxWidth: 820 }}>
            <strong>{t("callout.strong")}</strong> {t("callout.body")}{" "}
            <a
              href="https://torontosafes.ca/"
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "underline" }}
            >
              {t("callout.link")}
            </a>
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
              href="/manufacturing"
            >
              {t("nextStep.manufacturingCta")}
            </Link>
            <Link
              className="btn"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
              href="/dealers"
            >
              {t("nextStep.dealerCta")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
