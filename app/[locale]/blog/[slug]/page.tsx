import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { BLOG_POSTS_STRUCTURAL, formatBlogDate } from "@/lib/blog";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-i18n";
import { buildMetadata, canonicalFor } from "@/lib/seo";
import { SITE_URL } from "@/lib/nav";
import type { Locale } from "@/i18n/routing";

type Params = { slug: string; locale: string };

export function generateStaticParams() {
  return BLOG_POSTS_STRUCTURAL.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = getBlogPost(t, slug);
  if (!post) return {};

  return buildMetadata({
    locale: locale as Locale,
    pathname: `/blog/${post.slug}`,
    title: `${post.title} | The Vault, Torvault Safe Company`,
    description: post.excerpt,
    image: post.thumbnail,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations("blog");
  const tc = await getTranslations("productsCommon");
  const post = getBlogPost(t, slug);
  if (!post) notFound();

  const more = getAllBlogPosts(t)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const pageUrl = canonicalFor(locale as Locale, `/blog/${post.slug}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [`${SITE_URL}${post.thumbnail}`],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@type": "Organization", name: "Torvault Safe Company", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Torvault Safe Company",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-blue.png` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tc("home"), item: canonicalFor(locale as Locale, "/") },
      { "@type": "ListItem", position: 2, name: "The Vault", item: canonicalFor(locale as Locale, "/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pdp-crumb-bar">
        <div className="wrap breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/blog">The Vault</Link>
          <span>/</span>
          <span>{post.title}</span>
        </div>
      </div>

      <section>
        <div className="wrap">
          <Reveal className="blog-post-head">
            <span className="eyebrow">{post.category}</span>
            <h1>{post.title}</h1>
            <span className="blog-post-meta">
              {formatBlogDate(post.date)} &middot; {post.readTime}
            </span>
          </Reveal>

          {post.video ? (
            <div className="blog-post-video">
              <video
                src={post.video.src}
                poster={post.video.poster}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          ) : (
            <div className="blog-post-media">
              <Image
                src={post.thumbnail}
                alt={post.thumbnailAlt}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          <div className="blog-post-body">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="blog-post-cta">
            <Button href="/products" variant="primary">
              Compare Torvault Product Lines
            </Button>
            <Button href="/find-a-dealer" variant="outline">
              Find a Dealer
            </Button>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section>
          <div className="wrap">
            <Reveal className="section-head">
              <span className="eyebrow">{t("keepReadingEyebrow")}</span>
              <h2>{t("keepReadingHeading")}</h2>
            </Reveal>
            <div className="blog-grid">
              {more.map((p, i) => (
                <Reveal as="article" className="blog-card" delay={i * 80} key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="blog-card-link" aria-label={p.title}>
                    <span className="blog-card-media">
                      <Image
                        src={p.thumbnail}
                        alt={p.thumbnailAlt}
                        fill
                        sizes="(max-width: 860px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </span>
                    <span className="blog-card-body">
                      <span className="blog-card-meta">
                        <span className="blog-card-category">{p.category}</span>
                        <span>{formatBlogDate(p.date)}</span>
                      </span>
                      <h2>{p.title}</h2>
                      <p>{p.excerpt}</p>
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
      )}
    </main>
  );
}
