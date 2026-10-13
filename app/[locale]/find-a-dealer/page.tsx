import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DealerLocator from "@/components/DealerLocator";

export const metadata: Metadata = {
  title: "Find a Dealer | Torvault Safe Company",
  description:
    "Find an authorized Torvault safe dealer near you in Canada — showrooms, locksmith services, and delivery & installation.",
  alternates: { canonical: "/find-a-dealer" },
  openGraph: {
    type: "website",
    title: "Find a Torvault Dealer",
    description:
      "Find an authorized Torvault safe dealer near you in Canada.",
    images: ["/hero-safe.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function FindADealerPage() {
  return (
    <main>
      <PageHero
        crumb="Find a Dealer"
        eyebrow="Where to Buy"
        title="Find a Torvault dealer near you."
      >
        Torvault sells exclusively through authorized dealers &mdash; never
        direct to consumers. Search below for a showroom, locksmith, or
        delivery partner in your area.
      </PageHero>

      <section>
        <div className="wrap">
          <Reveal>
            <DealerLocator />
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap about-grid">
          <Reveal className="about-copy">
            <span className="eyebrow" style={{ color: "var(--brass-600)" }}>
              Not in Your Area Yet?
            </span>
            <h2>We&rsquo;re opening new territories now.</h2>
            <p>
              Torvault is in its first round of Canadian dealer onboarding.
              If there&rsquo;s no authorized dealer near you yet, you can
              still get certified specification sheets and be notified the
              moment a dealer opens in your territory.
            </p>
            <p>
              <Link className="cat-cta" href="/dealers">
                Explore the Dealer Program &rarr;
              </Link>
            </p>
          </Reveal>
          <Reveal className="about-copy" delay={100}>
            <span className="eyebrow" style={{ color: "var(--brass-600)" }}>
              Are You a Retailer or Locksmith?
            </span>
            <h2>Carry a certified line, not a marketing tier.</h2>
            <p>
              Independent dealers get wholesale pricing, territory
              protection, and zero direct-to-consumer competition from
              Torvault. Join the first intake round of Canadian dealers.
            </p>
            <p>
              <a
                className="cat-cta"
                href="mailto:dealers@torvaultsafe.com?subject=Torvault%20Dealer%20Inquiry"
              >
                Apply to Become a Dealer &rarr;
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
