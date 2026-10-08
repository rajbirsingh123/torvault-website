import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import PageHero from "@/components/PageHero";
import ProductSearch from "@/components/ProductSearch";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { SERIES_CONTENT, SERIES_LIST, modelsBySeries, seriesSizeRange } from "@/lib/safes";

export const metadata: Metadata = {
  title: "Safe Products | Fire & Burglary, TL-15, TL-30 — Torvault",
  description:
    "Compare Torvault's three UL-rated safe product lines: Fire & Burglary (UL 72 / RSC), TL-15 High Security, and TL-30 High Security — specs, construction, and who each line is built for.",
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    title: "Torvault Safe Products | Fire & Burglary, TL-15, TL-30",
    description:
      "Three UL-rated safe product lines, compared side by side — construction, resistance ratings, and typical use.",
    images: ["/safe-tl30.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const cut = text.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxChars).trimEnd()}…`;
}

export default function ProductsPage() {
  return (
    <main>
      <PageHero crumb="Products" eyebrow="Products" title="Three lines. One documented standard.">
        Torvault launches in Canada with three purpose-built product lines,
        each engineered around a specific threat &mdash; fire, forced entry,
        or both &mdash; and verified against UL testing methodology rather
        than an in-house marketing tier.
      </PageHero>

      <section>
        <div className="wrap">
          <ProductSearch />
          <div className="cat-grid">
            {SERIES_LIST.map((series, i) => {
              const content = SERIES_CONTENT[series];
              const range = seriesSizeRange(series);
              const modelCount = modelsBySeries(series).length;
              return (
                <TiltCard key={series}>
                  <Reveal as="article" className="cat-card" delay={i * 100}>
                    <div className="cat-visual">
                      <span className="cat-badge">{content.badge}</span>
                      <FavoriteButton
                        slug={content.slug}
                        label={content.label}
                        className="cat-visual-favorite"
                      />
                      <Image
                        src={content.image}
                        alt={content.imageAlt}
                        width={900}
                        height={506}
                        style={{ width: "100%", height: 230, objectFit: "cover" }}
                      />
                    </div>
                    <div className="cat-body">
                      <span className="cat-rating">{content.chips[0]}</span>
                      <h3>{content.label}</h3>
                      <p>{truncate(content.intro[0], 150)}</p>
                      <p className="cat-fit">
                        <strong>Best for:</strong> {truncate(content.bestFor, 110)}
                      </p>
                      <div className="cat-specs">
                        {content.specCells.slice(0, 3).map((cell) => (
                          <div className="row" key={cell.k}>
                            <span>{cell.k}</span>
                            <span>{cell.v}</span>
                          </div>
                        ))}
                        <div className="row">
                          <span>Sizes</span>
                          <span>
                            {modelCount} &middot; {range.min.toLocaleString()}&ndash;
                            {range.max.toLocaleString()} lbs
                          </span>
                        </div>
                      </div>
                      <span className="cat-cta" aria-hidden="true">
                        View Product &amp; Full Specs &rarr;
                      </span>
                    </div>
                    <Link
                      className="cat-card-link"
                      href={`/products/${content.slug}`}
                      aria-label={`View ${content.label} product details`}
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
          <Reveal className="section-head">
            <span className="eyebrow">Side by Side</span>
            <h2>Compare the product lines.</h2>
            <p>
              Every rating below is a documented UL classification &mdash;
              not a marketing tier. Full testing methodology is broken down
              on the{" "}
              <Link href="/certified-standard" style={{ textDecoration: "underline" }}>
                Certified Standard
              </Link>{" "}
              page.
            </p>
          </Reveal>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Product Line</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Net Working Time</th>
                  <th scope="col">Fire Endurance</th>
                  <th scope="col">Steel Body</th>
                  <th scope="col">Door</th>
                  <th scope="col">Relocking</th>
                  <th scope="col">Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <Link href="/products/fire-burglary" className="table-row-link">
                      Fire &amp; Burglary
                    </Link>
                  </th>
                  <td>UL RSC (B&#8209;rate)</td>
                  <td>5 min, all sides</td>
                  <td>1&#8211;Hr @ 350&deg;F</td>
                  <td>12 ga steel</td>
                  <td>Single-wall, dial lock</td>
                  <td>&mdash;</td>
                  <td>Home &amp; retail offices</td>
                </tr>
                <tr>
                  <th scope="row">
                    <Link href="/products/tl15" className="table-row-link">
                      TL&#8209;15
                    </Link>
                  </th>
                  <td>UL TL&#8209;15</td>
                  <td>15 min, door only</td>
                  <td>&mdash;</td>
                  <td>1&Prime; solid steel</td>
                  <td>Composite hardplate</td>
                  <td>2&#8211;way spring bolt</td>
                  <td>Bank branches, pharmacies</td>
                </tr>
                <tr>
                  <th scope="row">
                    <Link href="/products/tl30" className="table-row-link">
                      TL&#8209;30
                    </Link>
                  </th>
                  <td>UL TL&#8209;30</td>
                  <td>30 min, six sides</td>
                  <td>&mdash;</td>
                  <td>1.5&Prime; solid steel</td>
                  <td>Composite plate, 6 sides</td>
                  <td>4&#8211;way spring bolt</td>
                  <td>CIT depots, jewelers</td>
                </tr>
              </tbody>
            </table>
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
