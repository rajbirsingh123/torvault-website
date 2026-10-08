import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ManufacturingStory from "@/components/ManufacturingStory";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Manufacturing | How Torvault Safes Are Built — Torvault",
  description:
    "From steel forming to compliance testing: how Torvault engineers and manufactures UL-rated fire and burglary safes for the Canadian market.",
  alternates: { canonical: "/manufacturing" },
  openGraph: {
    type: "website",
    title: "How Torvault Safes Are Manufactured",
    description:
      "Design, steel forming, hardplate lamination, and compliance testing — the Torvault manufacturing process.",
    images: ["/hero-safe.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function ManufacturingPage() {
  return (
    <main>
      <PageHero
        crumb="Manufacturing"
        eyebrow="Manufacturing"
        title="Designed for Canada. Built to reach it."
      >
        Torvault safes are engineered to Canadian security and fire-testing
        conventions, then manufactured at scale in Vietnam &mdash; giving
        Canadian dealers a certified alternative at a materially different
        price point than domestic-only production.
      </PageHero>

      <ManufacturingStory />

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Quality Commitments</span>
            <h2>What we won&rsquo;t compromise on.</h2>
          </Reveal>
          <div className="icon-grid">
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
                </svg>
              </span>
              <h4>UL Methodology First</h4>
              <p>
                Ratings are engineered targets from day one, not
                retrofitted claims after production.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </span>
              <h4>Documented QA at Every Stage</h4>
              <p>
                Steel gauge, weld integrity, hardplate placement, and lock
                function are checked before a unit moves to the next
                stage.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 13v-1a8 8 0 0116 0v1" />
                  <rect x="2.5" y="13" width="4" height="6" rx="1.4" />
                  <rect x="17.5" y="13" width="4" height="6" rx="1.4" />
                  <path d="M20 19v1a3 3 0 01-3 3h-3" />
                </svg>
              </span>
              <h4>Engineered for Canadian Climate</h4>
              <p>
                Finish and hardware are specified for the humidity and
                temperature range Canadian dealers actually install into.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="5.5" />
                  <path d="M8.5 12.5L7 21l5-2.5 5 2.5-1.5-8.5" />
                </svg>
              </span>
              <h4>39 Years of Field Feedback</h4>
              <p>
                Built by the same team that services and installs safes
                daily &mdash; not a factory guessing what dealers need.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="callout" style={{ maxWidth: 820, margin: "0 auto" }}>
            <strong>Direct import, no middle-market markup.</strong> Torvault
            manufactures at scale in Vietnam and imports directly to Canada
            &mdash; the same route that lets us price at wholesale for
            dealers without compromising on UL testing methodology or
            steel specification.
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
            <h2>See what each rating actually resists.</h2>
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
              href="/certified-standard"
            >
              Certified Standard
            </Link>
            <Link
              className="btn"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
              href="/products"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
