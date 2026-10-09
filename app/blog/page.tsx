import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS, formatBlogDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "The Vault | Torvault Safe Company Blog",
  description:
    "Guides on UL security ratings, fire protection, sizing, and installation — written by the team behind Torvault's dealer-first line of high-security safes.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "The Vault | Torvault Safe Company Blog",
    description:
      "Guides on UL security ratings, fire protection, sizing, and installation from Torvault Safe Company.",
    images: ["/blog/ul-security-ratings.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function BlogIndexPage() {
  return (
    <main>
      <PageHero crumb="Blog" eyebrow="The Vault" title="Guides from the Torvault team.">
        Security ratings, fire protection, sizing, and installation &mdash;
        written by the same team that has sold, serviced, and installed
        safes across the GTA since 1987.
      </PageHero>

      <section>
        <div className="wrap">
          <div className="blog-grid">
            {BLOG_POSTS.map((post, i) => (
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
                      Read the Guide &rarr;
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
