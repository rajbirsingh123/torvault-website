import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { BLOG_POSTS, getBlogPost, formatBlogDate } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | The Vault, Torvault Safe Company`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.thumbnail],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.thumbnail],
    datePublished: post.date,
    author: { "@type": "Organization", name: "Torvault Safe Company" },
    publisher: { "@type": "Organization", name: "Torvault Safe Company" },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
              <span className="eyebrow">Keep Reading</span>
              <h2>More from The Vault.</h2>
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
                        Read the Guide &rarr;
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
