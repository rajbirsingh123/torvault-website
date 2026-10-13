import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { formatBlogDate } from "@/lib/blog";
import { getAllBlogPosts } from "@/lib/blog-i18n";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { BreadcrumbJsonLd } from "@/components/SeoJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/blog",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/blog/ul-security-ratings.jpg",
  });
}

export default async function BlogIndexPage() {
  const t = await getTranslations("blog");
  const tc = await getTranslations("productsCommon");
  const locale = await getLocale();
  const posts = getAllBlogPosts(t);
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
                      {t("readTheGuide")}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
