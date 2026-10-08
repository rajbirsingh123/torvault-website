import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Torvault | A New Line, Backed by 39 Years of Security Experience",
  description:
    "Torvault is a new high-security safe manufacturing brand from Security Lock & Safe Inc., operators of Toronto Safes and GTA safe experts since 1987.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About Torvault Safe Company",
    description:
      "A new high-security safe manufacturing brand backed by 39 years of Canadian security industry experience.",
    images: ["/safe-tl30.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return (
    <main>
      <PageHero crumb="About" eyebrow="About Torvault" title="A new line, backed by decades of experience.">
        Torvault is a new high-security safe brand entering the Canadian
        market in 2026 &mdash; built by the team behind Security Lock &amp;
        Safe Inc., a GTA safe and vault door provider since 1987.
      </PageHero>

      <section>
        <div className="wrap about-grid">
          <div className="about-media">
            <Image
              src="/safe-tl30.jpg"
              alt="Torvault TL-30 High Security safe, navy blue steel body with chrome locking wheel"
              width={900}
              height={506}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="about-copy">
            <span className="eyebrow" style={{ color: "var(--brass-600)" }}>
              Our Story
            </span>
            <h2>Why we built Torvault.</h2>
            <p>
              Security Lock &amp; Safe Inc. has spent 39 years selling,
              servicing, and installing safes and vault doors across the
              Greater Toronto Area under the Toronto Safes name &mdash;
              working with homes, retail chains, and institutional clients
              including government offices, hospitals, and law enforcement
              agencies.
            </p>
            <p>
              That work gave us a direct view into a gap in the Canadian
              market: independent safe dealers outside our own retail
              footprint had few UL-certified options that weren&rsquo;t
              either imported at retail markup or sold direct-to-consumer by
              the manufacturer, competing with the dealers who were supposed
              to sell it.
            </p>
            <p>
              Torvault is our answer &mdash; a manufacturing brand, not a
              retail one. We engineer to UL testing methodology, manufacture
              at scale in Vietnam, and sell exclusively through independent
              Canadian dealers at wholesale pricing with territory
              protection.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--surface)" }}>
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
            <span className="eyebrow">How We&rsquo;re Different</span>
            <h2>Built for the dealer channel.</h2>
          </Reveal>
          <ul className="about-list" style={{ maxWidth: 900 }}>
            <li>
              <span className="num">01</span>
              <div>
                <h4>Dealer-First Model</h4>
                <p>
                  Wholesale pricing and territory protection built for
                  independent safe and security dealers, not
                  direct-to-consumer retail. Torvault never sells direct
                  &mdash; every unit moves through an authorized dealer.
                </p>
              </div>
            </li>
            <li>
              <span className="num">02</span>
              <div>
                <h4>Documented UL Testing</h4>
                <p>
                  Every product line is built and verified against UL 72, UL
                  RSC, and UL TL testing methodology before it ships &mdash;
                  see the{" "}
                  <Link href="/certified-standard" style={{ textDecoration: "underline" }}>
                    full breakdown
                  </Link>
                  .
                </p>
              </div>
            </li>
            <li>
              <span className="num">03</span>
              <div>
                <h4>Direct Import Pricing</h4>
                <p>
                  Manufactured at scale in Vietnam and imported directly
                  &mdash; no middle-market distributor markup passed on to
                  your customers.
                </p>
              </div>
            </li>
            <li>
              <span className="num">04</span>
              <div>
                <h4>39 Years of Industry Backing</h4>
                <p>
                  Supported by Security Lock &amp; Safe Inc.&rsquo;s decades
                  of sales, service, and delivery experience in the Canadian
                  safe market &mdash; we know what dealers actually need
                  from a supplier.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section style={{ background: "var(--surface)" }}>
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
