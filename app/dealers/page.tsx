import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import DealerApplicationForm from "@/components/DealerApplicationForm";
import CountUp from "@/components/CountUp";
import StepCarousel from "@/components/StepCarousel";
import Link from "next/link";

const ONBOARDING_STEPS: { num: string; title: string; body: ReactNode }[] = [
  {
    num: "01",
    title: "Inquire",
    body: (
      <>
        Email{" "}
        <a href="mailto:dealers@torvaultsafe.com" style={{ textDecoration: "underline" }}>
          dealers@torvaultsafe.com
        </a>{" "}
        or submit the form below with your business name and region.
      </>
    ),
  },
  {
    num: "02",
    title: "Territory & Fit Review",
    body: "We confirm territory availability and walk through which product lines fit your typical client base.",
  },
  {
    num: "03",
    title: "Dealer Agreement",
    body: "Wholesale pricing, territory terms, and lead-time commitments are set out in your dealer agreement.",
  },
  {
    num: "04",
    title: "Onboarding & First Order",
    body: "You receive certified spec sheets, marketing assets, and your first order timeline.",
  },
];

export const metadata: Metadata = {
  title: "Become a Dealer | Torvault Safe Company",
  description:
    "Torvault is onboarding its first Canadian dealer territories — wholesale pricing, territory protection, and a UL-tested line with no direct-to-consumer competition.",
  alternates: { canonical: "/dealers" },
  openGraph: {
    type: "website",
    title: "Torvault Dealer Program",
    description:
      "Wholesale pricing, territory protection, and a UL-tested safe line for independent Canadian dealers.",
    images: ["/safe-tl30.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function DealersPage() {
  return (
    <main>
      <PageHero crumb="Dealers" eyebrow="Dealer Program" title="Now onboarding Canadian dealers.">
        Torvault is opening its first dealer territories across Canada
        &mdash; wholesale pricing, territory protection, and a UL-tested
        line with zero direct-to-consumer competition from us.
      </PageHero>

      <div className="wrap" style={{ marginTop: -28, marginBottom: 28 }}>
        <p style={{ fontSize: 13.5 }}>
          Looking to buy a Torvault safe, not sell one?{" "}
          <Link href="/find-a-dealer" style={{ textDecoration: "underline" }}>
            Find an authorized dealer near you &rarr;
          </Link>
        </p>
      </div>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Program Benefits</span>
            <h2>Built to protect your margin.</h2>
            <p>
              Torvault exists because independent dealers deserve a
              certified supplier that doesn&rsquo;t compete with them at
              retail. Every part of the program is built around that.
            </p>
          </Reveal>
          <div className="icon-grid">
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 11l9-7 9 7" />
                  <path d="M5 10v10h14V10" />
                </svg>
              </span>
              <h4>Territory Protection</h4>
              <p>
                Onboarded dealers get defined regional territory &mdash;
                details confirmed during application review.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </span>
              <h4>Wholesale Pricing</h4>
              <p>
                Direct-import pricing from our Vietnam production facility
                &mdash; no middle-market distributor markup.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M1 4h13v11H1zM14 8h4l4 4v3h-8z" />
                  <circle cx="6" cy="18" r="1.8" />
                  <circle cx="17" cy="18" r="1.8" />
                </svg>
              </span>
              <h4>Zero Direct-to-Consumer Competition</h4>
              <p>
                Torvault sells exclusively through dealers. We never list
                pricing publicly or sell direct.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
                </svg>
              </span>
              <h4>Certified Spec Sheets</h4>
              <p>
                UL-methodology documentation for every product line, ready to
                hand to a client or insurer.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="5.5" />
                  <path d="M8.5 12.5L7 21l5-2.5 5 2.5-1.5-8.5" />
                </svg>
              </span>
              <h4>39 Years of Industry Support</h4>
              <p>
                Backed by Security Lock &amp; Safe Inc.&rsquo;s decades of
                sales, service, and delivery experience.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M8 2v4M16 2v4M3 10h18" />
                </svg>
              </span>
              <h4>Early Territory Intake</h4>
              <p>
                First-round dealers get priority on lead time and inventory
                as the line ramps to full production.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">How It Works</span>
            <h2>Four steps to onboarding.</h2>
          </Reveal>
          <StepCarousel steps={ONBOARDING_STEPS} />
        </div>
      </section>

      <section id="dealer" className="dealer">
        <div className="wrap dealer-grid">
          <div>
            <span className="eyebrow">Launch Snapshot</span>
            <h2>First intake round, open now.</h2>
            <p>
              Territory and specification sheets are available now for the
              first round of Canadian dealer onboarding.
            </p>
            <a
              className="btn btn-primary"
              href="mailto:dealers@torvaultsafe.com?subject=Torvault%20Dealer%20Inquiry"
            >
              Request Dealer Package
            </a>
          </div>
          <div className="dealer-stats">
            <div className="dealer-stat">
              <div className="num"><CountUp value="3" /></div>
              <div className="lbl">Product lines at launch</div>
            </div>
            <div className="dealer-stat">
              <div className="num"><CountUp value={"TL‑30"} /></div>
              <div className="lbl">Top burglary rating</div>
            </div>
            <div className="dealer-stat">
              <div className="num"><CountUp value="CA" /></div>
              <div className="lbl">Canadian dealer focus</div>
            </div>
            <div className="dealer-stat">
              <div className="num"><CountUp value="01" /></div>
              <div className="lbl">Territory intake round</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="cta-banner">
            <span
              className="eyebrow"
              style={{ justifyContent: "center", color: "var(--brass-600)" }}
            >
              Get In Touch
            </span>
            <h2>Tell us about your business.</h2>
            <p>
              Send your business name, region, and a note on your current
              product line &mdash; we&rsquo;ll follow up with territory
              availability and a spec package.
            </p>
            <DealerApplicationForm />
            <p className="form-note">
              By submitting, you agree to be contacted by Torvault Safe
              Company regarding dealer onboarding. See our{" "}
              <Link href="/faq">FAQ</Link> for more on the application
              process.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
