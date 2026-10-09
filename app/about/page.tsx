import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AboutMediaScroll from "@/components/AboutMediaScroll";
import { BLOG_POSTS, formatBlogDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "About Torvault | Backed by 39 Years of Security Experience",
  description:
    "Torvault is a high-security safe manufacturing brand from Security Lock & Safe Inc., operators of Toronto Safes and GTA safe experts since 1987.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About Torvault Safe Company",
    description:
      "A high-security safe manufacturing brand backed by 39 years of Canadian security industry experience.",
    images: ["/safe-tl30.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero crumb="About" eyebrow="About Torvault" title="Toughest brand, backed by decades of experience.">
        Torvault is a high-security safe brand built by the team behind
        Security Lock &amp; Safe Inc., a GTA safe and vault door provider
        since 1987.
      </PageHero>

      <section>
        <div className="wrap about-grid">
          <div className="about-media">
            <AboutMediaScroll />
          </div>
          <div className="about-copy">
            <span className="eyebrow" style={{ color: "var(--brass-600)" }}>
              Our Story
            </span>
            <h2>Why we built Torvault.</h2>
            <p>
              Built on decades of experience in physical security, Torvault
              was created to raise the standard for high-security
              protection.
            </p>
            <p>
              Our foundation goes back to 1987 through Security Lock &amp;
              Safe Inc., where decades of hands-on experience protecting
              businesses, valuables, and critical assets shaped our
              approach.
            </p>
            <p>
              Torvault carries that legacy forward into a new generation of
              high-security safes, combining robust construction, advanced
              locking systems, and thoughtful engineering.
            </p>
            <p>
              We believe security should never be compromised, and every
              Torvault safe is designed around that principle.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Timeline</span>
            <h2>From a Concord locksmith counter to a national line.</h2>
          </Reveal>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-year">1987</span>
              <div>
                <h3>Security Lock &amp; Safe Inc. founded</h3>
                <p>
                  Established in Concord, Ontario, offering safe sales,
                  service, and commercial locksmithing to the Greater
                  Toronto Area.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">1987&#8211;2025</span>
              <div>
                <h3>Toronto Safes grows into a trusted regional name</h3>
                <p>
                  Nearly four decades supplying and installing safes and
                  vault doors for residential, retail, industrial, and
                  institutional clients &mdash; including government,
                  hospital, and law enforcement accounts &mdash; plus
                  emergency lockout and locksmithing services across the
                  GTA.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <span className="timeline-year">2026</span>
              <div>
                <h3>Torvault launches</h3>
                <p>
                  The same team enters manufacturing with a dealer-first,
                  UL-tested line built for independent Canadian safe dealers
                  &mdash; not for direct-to-consumer retail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">The Vault</span>
            <h2>Guides from the Torvault team.</h2>
          </Reveal>
          <div className="blog-grid">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
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
          <p style={{ textAlign: "center", marginTop: 36 }}>
            <Link className="cat-cta" href="/blog">
              View All Posts &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="callout" style={{ maxWidth: 820 }}>
            <strong>Backed by Security Lock &amp; Safe Inc.</strong> &mdash;
            based in Concord, Ontario, and operating as Toronto Safes since
            1987, serving residential, commercial, industrial, and
            institutional clients across the GTA with safe sales, delivery,
            installation, vault doors, commercial locksmithing, and
            emergency lockout service.{" "}
            <a
              href="https://torontosafes.ca/"
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "underline" }}
            >
              Visit Toronto Safes &rarr;
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
              Next Step
            </span>
            <h2>See how the safes are made.</h2>
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
              Manufacturing Process
            </Link>
            <Link
              className="btn"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
              href="/dealers"
            >
              Become a Dealer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
