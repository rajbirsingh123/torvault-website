import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import BuildStory from "@/components/BuildStory";
import AboutStory from "@/components/AboutStory";
import FaqAccordion from "@/components/FaqAccordion";
import NewsletterForm from "@/components/NewsletterForm";
import ProductGallery from "@/components/ProductGallery";
import Reveal from "@/components/Reveal";
import CertSeal from "@/components/CertSeal";
import Button from "@/components/Button";
import NeuralButton from "@/components/NeuralButton";
import NeuralBorder from "@/components/NeuralBorder";

type CertOrbitItem =
  | { type: "seal"; glyph: string; k: string; v: string }
  | { type: "photo"; src: string; alt: string; k: string; v: string };

const CERT_ORBIT: CertOrbitItem[] = [
  { type: "seal", glyph: "UL", k: "UL Listed", v: "Security Rated" },
  {
    type: "photo",
    src: "/products/graphite/01-torvault-front-closed.jpg",
    alt: "Torvault safe, graphite finish",
    k: "Graphite Finish",
    v: "BF‑914",
  },
  { type: "seal", glyph: "15", k: "TL‑15", v: "Burglary Resistant" },
  {
    type: "photo",
    src: "/products/black/01-torvault-black-front-closed.jpg",
    alt: "Torvault safe, black finish",
    k: "Black Finish",
    v: "BF‑914",
  },
  { type: "seal", glyph: "30", k: "TL‑30", v: "Burglary Resistant" },
  {
    type: "photo",
    src: "/products/graphite/02-torvault-front-open.jpg",
    alt: "Torvault safe interior, shelf and boltwork",
    k: "Interior View",
    v: "Shelf + Boltwork",
  },
  { type: "seal", glyph: "III", k: "EN 1143‑1", v: "Resistance Grade III" },
  {
    type: "photo",
    src: "/products/black/05-torvault-black-interior-detail.jpg",
    alt: "Torvault boltwork detail, black finish",
    k: "Boltwork Detail",
    v: "3‑Point Locking",
  },
];

type Testimonial = { name: string; quote: string; when: string };

/**
 * Torvault sells wholesale-only (no direct-to-consumer sales), so it has no
 * reviews of its own yet. These are real, publicly posted Google reviews for
 * Toronto Safes — the retail arm of Security Lock & Safe Inc., the same
 * parent company backing Torvault — shortened to brief attributed excerpts.
 * Source: https://www.google.com/maps/place/?q=place_id:ChIJ5TUrYaMvK4gRFIZT3vaOY2Q
 */
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chris Kay",
    quote: "Knowledgeable, punctual, and an overall delight to deal with.",
    when: "10 months ago",
  },
  {
    name: "Jack C.",
    quote: "One of the most friendly, customer-service-oriented staff.",
    when: "5 years ago",
  },
  {
    name: "Al F.",
    quote: "Kelly and the team are phenomenal.",
    when: "2 years ago",
  },
];

type StoryPillar = { title: string; body: string; icon: ReactNode };

const STORY_PILLARS: StoryPillar[] = [
  {
    title: "Fire-Rated Core",
    body: "Gypsum composite fill engineered to hold an internal 350°F ceiling well past the rated hour, so documents and drives survive what the building doesn’t.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
      </svg>
    ),
  },
  {
    title: "Forced-Entry Resistance",
    body: "Composite hardplate, relocking bolts, and solid steel bodies built to resist prybars, drills, and saws for a documented net working time — not a marketing tier.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Independently Tested",
    body: "Every rating is UL & ULC verified, tool-by-tool, by a third party — the same standard insurers use to set coverage limits.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.78 4.78 4 4 0 01-6.74 0 4 4 0 01-4.78-4.78 4 4 0 010-6.75z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export const metadata: Metadata = {
  title: "Torvault Safe Company | Fire & High-Security Safes, Canada",
  description:
    "Torvault engineers UL-rated fire and burglary safes — from factory fire-tested protection to UL TL-30 tool resistance — for Canadian businesses and dealers.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Torvault Safe Company | The Line That Doesn't Move",
    description:
      "UL-rated fire and burglary safes engineered for Canadian businesses — Fire & Burglary, TL-15, and TL-30 High Security product lines.",
    images: ["/hero-safe.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

const homeFaqs = [
  {
    question: "What does a UL security rating actually mean?",
    answer: (
      <>
        UL (Underwriters Laboratories) independently tests safes against real
        tools &mdash; prybars, drills, saws &mdash; for a set net working
        time. A TL&#8209;15 safe resists a professional attack with common
        tools for 15 minutes; TL&#8209;30 for 30. It&rsquo;s the same
        standard insurers use to set coverage limits. See our{" "}
        <Link href="/certified-standard" style={{ textDecoration: "underline" }}>
          Certified Standard guide
        </Link>{" "}
        for the full breakdown.
      </>
    ),
  },
  {
    question: "What's the difference between TL-15 and TL-30 safes?",
    answer: (
      <>
        The number is net working time &mdash; how long the UL-rated door and
        boltwork resist a professional attack with common tools. TL&#8209;15
        holds for 15 minutes, TL&#8209;30 for 30, with a thicker 1.5&Prime;
        solid steel body and hardplate across all six sides. Higher-value
        contents and higher insurance limits generally call for TL&#8209;30.
        Compare specs on our{" "}
        <Link href="/products" style={{ textDecoration: "underline" }}>
          Products page
        </Link>
        .
      </>
    ),
  },
  {
    question: "Where can I buy a Torvault safe?",
    answer: (
      <>
        Torvault sells exclusively through authorized dealers across
        Canada &mdash; we don&rsquo;t sell direct to consumers. Use our{" "}
        <Link href="/find-a-dealer" style={{ textDecoration: "underline" }}>
          Find a Dealer
        </Link>{" "}
        page to locate one near you, or see our{" "}
        <Link href="/dealers" style={{ textDecoration: "underline" }}>
          Dealer Program
        </Link>{" "}
        if you&rsquo;re a retailer interested in carrying the line.
      </>
    ),
  },
  {
    question: "How long will my documents survive in a fire?",
    answer: (
      <>
        Our Fire &amp; Burglary line carries a UL Class 350 rating: the
        interior stays below 350&deg;F &mdash; the temperature paper starts
        to char &mdash; for a full hour, even while the fire outside reaches
        up to 1,700&deg;F. That hour is tested, not estimated; it&rsquo;s the
        same net-working-time methodology UL uses across every rating we
        carry.
      </>
    ),
  },
  {
    question: "Do insurance companies recognize Torvault's ratings?",
    answer: (
      <>
        Yes. Our TL&#8209;15 and TL&#8209;30 security ratings are
        independently tested by UL, not self-certified in-house &mdash; the
        standard insurers reference when setting coverage limits for cash,
        firearms, and documents. Our Fire &amp; Burglary line is factory
        fire-tested. Ask your insurer which rating your policy requires
        before choosing a model.
      </>
    ),
  },
  {
    question: "What sizes and capacities are available?",
    answer: (
      <>
        Each of our three lines spans a wide range, from compact
        home-and-office models up to large commercial vaults, so capacity
        scales with the rating you need rather than forcing a single body
        size. Browse interior dimensions and weight for every model on the{" "}
        <Link href="/products" style={{ textDecoration: "underline" }}>
          Products page
        </Link>
        .
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <main id="top">
      <section className="hero">
        <HeroVideo />
        <div className="wrap hero-grid">
          <span className="eyebrow hero-kicker">
            Torvault Safe Company
          </span>
          <h1 className="hero-headline">
            <span className="word-mask">
              <span className="word" style={{ "--wi": 0 } as React.CSSProperties}>
                Security
              </span>
            </span>{" "}
            <span className="word-mask">
              <span className="word" style={{ "--wi": 1 } as React.CSSProperties}>
                without
              </span>
            </span>{" "}
            <span className="word-mask">
              <span className="word" style={{ "--wi": 2 } as React.CSSProperties}>
                compromise.
              </span>
            </span>
          </h1>
          <div className="hero-ctas">
            <NeuralButton href="/products" accent="gold">
              View Products
              <svg
                className="neural-btn-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </NeuralButton>
          </div>
        </div>
        <span className="hero-scroll-cue" aria-hidden="true">
          Scroll
        </span>
      </section>

      <section className="trust-bar">
        <div className="wrap trust-grid">
          <NeuralButton accent="ice" className="trust-pill">
            <span className="trust-item-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
              </svg>
            </span>
            <span>UL &amp; ENL43 Tested Standards</span>
          </NeuralButton>
          <NeuralButton accent="ice" className="trust-pill">
            <span className="trust-item-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="5.5" />
                <path d="M8.5 12.5L7 21l5-2.5 5 2.5-1.5-8.5" />
              </svg>
            </span>
            <span>Backed by 40 Years of Security Expertise</span>
          </NeuralButton>
          <NeuralButton accent="ice" className="trust-pill">
            <span className="trust-item-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 13v-1a8 8 0 0116 0v1" />
                <rect x="2.5" y="13" width="4" height="6" rx="1.4" />
                <rect x="17.5" y="13" width="4" height="6" rx="1.4" />
                <path d="M20 19v1a3 3 0 01-3 3h-3" />
              </svg>
            </span>
            <span>Engineered for the Toughest Environment</span>
          </NeuralButton>
        </div>
      </section>

      <section className="story-strip">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Engineering</span>
            <h2>Engineered against the threats that matter.</h2>
            <p>
              Fire protection, forced-entry resistance, and independent
              verification aren&rsquo;t options on a Torvault safe &mdash;
              they&rsquo;re the baseline every product line is built from.
            </p>
          </Reveal>
          <div className="story-grid">
            {STORY_PILLARS.map((pillar, i) => (
              <Reveal as="article" className="story-item" delay={i * 120} key={pillar.title}>
                <NeuralBorder accent="ice" radius={24} />
                <span className="story-icon">{pillar.icon}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="products">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Products</span>
            <h2>Three lines. One standard.</h2>
            <p>
              Three purpose-built product lines, each engineered around a
              specific threat &mdash; fire, forced entry, or both &mdash;
              rather than a one-size body with a bigger price tag.
            </p>
          </Reveal>

          <ProductGallery />
        </div>
      </section>

      <BuildStory />

      <section>
        <div className="wrap">
          <Reveal
            className="section-head"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Certified Standard
            </span>
            <h2>Specification, not a marketing tier.</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>
              Every Torvault safe is built to a documented testing standard
              &mdash; factory fire testing on Fire &amp; Burglary, or
              independent UL testing on TL&#8209;15 and TL&#8209;30 &mdash;
              not an in-house label alone. Our Certified Standard page breaks
              down exactly what each rating means, how testing works, and why
              insurers use it to set coverage limits.
            </p>
          </Reveal>

          <Reveal className="cert-marquee-wrap" delay={100}>
            <div className="cert-marquee">
              <div className="cert-marquee-track">
                {[...CERT_ORBIT, ...CERT_ORBIT].map((item, i) => (
                  <div className="cert-orbit" key={`${item.k}-${i}`}>
                    {item.type === "seal" ? (
                      <span className="cert-orbit-circle seal">
                        <CertSeal glyph={item.glyph} />
                      </span>
                    ) : (
                      <span className="cert-orbit-circle photo">
                        <Image src={item.src} alt={item.alt} fill sizes="104px" style={{ objectFit: "cover" }} />
                      </span>
                    )}
                    <span className="cert-orbit-label">
                      <span className="cert-orbit-k">{item.k}</span>
                      <span className="cert-orbit-v">{item.v}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} style={{ textAlign: "center", marginTop: 36 }}>
            <Button href="/certified-standard" variant="primary">
              Read the Full Certified Standard Guide
            </Button>
          </Reveal>
        </div>
      </section>

      <AboutStory />

      <section id="faq">
        <div className="wrap">
          <Reveal
            className="section-head"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              FAQ
            </span>
            <h2>Frequently asked questions.</h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={homeFaqs} />
          </Reveal>
          <p style={{ textAlign: "center", marginTop: 36 }}>
            <Link className="cat-cta" href="/faq">
              View All FAQs &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section id="testimonials" className="notebook">
        <div className="wrap">
          <Reveal
            className="section-head"
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}
          >
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Customer Reviews
            </span>
            <h2>Trusted since 1987.</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>
              Torvault is backed by Security Lock &amp; Safe Inc. &mdash; 40
              years in the Canadian safe industry through Toronto Safes.
            </p>
          </Reveal>

          <div className="notebook-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal as="article" className="notebook-note" delay={i * 120} key={t.name}>
                <span className="notebook-note-pin" aria-hidden="true" />
                <p className="notebook-note-quote">&ldquo;{t.quote}&rdquo;</p>
                <p className="notebook-note-sig">{t.name}</p>
                <span className="notebook-note-source">Google Review &middot; {t.when}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0" }}>
        <div className="wrap">
          <Reveal className="cta-banner">
            <span
              className="eyebrow"
              style={{ justifyContent: "center", color: "var(--brass-600)" }}
            >
              Stay Updated
            </span>
            <h2>Get updates from Torvault.</h2>
            <p>
              Be the first to know about new safe models, security tips, and
              special offers &mdash; straight from Torvault.
            </p>
            <NewsletterForm />
            <p className="form-note">
              By entering your phone number, you agree to receive marketing
              messages from Torvault Safe Company at the number provided.
              Consent is not a condition of purchase. Message and data rates
              may apply. Reply HELP for help or STOP to cancel. See our{" "}
              <Link href="/terms" style={{ textDecoration: "underline" }}>
                Terms &amp; Conditions
              </Link>{" "}
              for details.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
