import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import SafeSpecTable from "@/components/SafeSpecTable";
import ProductBuyBox from "@/components/ProductBuyBox";
import ProductPdpGallery from "@/components/ProductPdpGallery";
import {
  SERIES_CONTENT,
  SERIES_LIST,
  modelsBySeries,
  seriesSizeRange,
  type SafeSeries,
} from "@/lib/safes";

type Params = { series: string };

export function generateStaticParams() {
  return SERIES_LIST.map((series) => ({ series }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { series } = await params;
  const content = SERIES_CONTENT[series as SafeSeries];
  if (!content) return {};

  return {
    title: `${content.label} Safes | Torvault Safe Company`,
    description: content.metaDescription,
    alternates: { canonical: `/products/${content.slug}` },
    openGraph: {
      type: "website",
      title: `Torvault ${content.label}`,
      description: content.metaDescription,
      images: [content.image],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { series } = await params;
  const content = SERIES_CONTENT[series as SafeSeries];
  if (!content) notFound();

  const models = modelsBySeries(content.series);
  const range = seriesSizeRange(content.series);
  const otherSeries = SERIES_LIST.filter((s) => s !== content.series);

  return (
    <main>
      <div className="pdp-crumb-bar">
        <div className="wrap breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <span>{content.label}</span>
        </div>
      </div>

      <section className="pdp-hero">
        <div className="wrap">
          <div className="detail-row has-gallery">
            <ProductPdpGallery slug={content.slug} label={content.label} />
            <div className="detail-copy">
              <div className="chip-row">
                {content.chips.map((chip) => (
                  <span className="chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
              <h1>{content.label}</h1>
              <p>{content.intro[0]}</p>
              <ProductBuyBox models={models} seriesLabel={content.label} />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Overview</span>
            <h2>Built to a documented standard.</h2>
          </Reveal>
          {content.intro.slice(1).map((paragraph, i) => (
            <p key={i} style={{ maxWidth: "70ch", marginTop: i === 0 ? 0 : 14 }}>
              {paragraph}
            </p>
          ))}
          <div className="detail-specs" style={{ marginTop: 28 }}>
            {content.specCells.map((cell) => (
              <div className="cell" key={cell.k}>
                <div className="v">{cell.v}</div>
                <div className="k">{cell.k}</div>
              </div>
            ))}
          </div>
          <div className="detail-use">
            <strong>Best for:</strong> {content.bestFor}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Key Features</span>
            <h2>What comes standard.</h2>
          </Reveal>
          <ul className="feature-list pdp-feature-grid">
            {content.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <div className="spec-head">
            <div>
              <span className="eyebrow">Full Model Lineup</span>
              <h3>{models.length} sizes, built to order.</h3>
              <p>
                Sort by size or weight below, or request a quote on any
                model &mdash; every {content.label} unit ships in the
                dimensions listed.
              </p>
            </div>
            <div className="spec-stats">
              <span className="spec-stat">
                <strong>{models.length}</strong> models
              </span>
              <span className="spec-stat">
                <strong>
                  {range.min.toLocaleString()}&ndash;{range.max.toLocaleString()}
                </strong>{" "}
                lbs range
              </span>
            </div>
          </div>
          <SafeSpecTable models={models} seriesLabel={content.label} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Explore the Line</span>
            <h2>Compare other product types.</h2>
          </Reveal>
          <div className="cat-grid">
            {otherSeries.map((s, i) => {
              const other = SERIES_CONTENT[s];
              return (
                <TiltCard key={s}>
                  <Reveal as="article" className="cat-card" delay={i * 100}>
                    <div className="cat-visual">
                      <span className="cat-badge">{other.badge}</span>
                      <Image
                        src={other.image}
                        alt={other.imageAlt}
                        width={900}
                        height={506}
                        style={{ width: "100%", height: 230, objectFit: "cover" }}
                      />
                    </div>
                    <div className="cat-body">
                      <span className="cat-rating">{other.chips[0]}</span>
                      <h3>{other.label}</h3>
                      <p>{other.intro[0].slice(0, 118)}&hellip;</p>
                      <div className="cat-specs">
                        {other.specCells.slice(0, 3).map((cell) => (
                          <div className="row" key={cell.k}>
                            <span>{cell.k}</span>
                            <span>{cell.v}</span>
                          </div>
                        ))}
                      </div>
                      <span className="cat-cta" aria-hidden="true">
                        View Product &rarr;
                      </span>
                    </div>
                    <Link
                      className="cat-card-link"
                      href={`/products/${other.slug}`}
                      aria-label={`View ${other.label} product details`}
                    />
                  </Reveal>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Reveal
            className="section-head"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Not Sure Which Line Fits?
            </span>
            <h2>Talk to a Torvault dealer specialist.</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>
              Territory and specification sheets are available now for the
              first round of Canadian dealer onboarding.
            </p>
          </Reveal>
          <div style={{ textAlign: "center" }}>
            <Link
              className="btn btn-primary"
              style={{ background: "var(--navy-950)", color: "#fff" }}
              href="/dealers"
            >
              Request Dealer Package
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
