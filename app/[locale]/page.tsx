import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
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
import { interpolateNodes } from "@/lib/richText";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type CertOrbitItem =
  | { type: "seal"; glyph: string; k: string; v: string }
  | { type: "photo"; src: string; alt: string; k: string; v: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return buildMetadata({
    locale: locale as Locale,
    pathname: "/",
    title: t("meta.title"),
    description: t("meta.description"),
    image: "/hero-safe.jpg",
  });
}

export default async function HomePage() {
  const t = await getTranslations("home");

  const STORY_PILLARS = [
    {
      title: t("story.pillar1Title"),
      body: t("story.pillar1Body"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
        </svg>
      ),
    },
    {
      title: t("story.pillar2Title"),
      body: t("story.pillar2Body"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: t("story.pillar3Title"),
      body: t("story.pillar3Body"),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.78 4.78 4 4 0 01-6.74 0 4 4 0 01-4.78-4.78 4 4 0 010-6.75z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ];

  const CERT_ORBIT: CertOrbitItem[] = [
    { type: "seal", glyph: "UL", k: t("certOrbit.ulListedK"), v: t("certOrbit.ulListedV") },
    {
      type: "photo",
      src: "/products/graphite/01-torvault-front-closed.jpg",
      alt: "Torvault safe, graphite finish",
      k: t("certOrbit.graphiteFinishK"),
      v: "BF‑914",
    },
    { type: "seal", glyph: "15", k: t("certOrbit.tl15K"), v: t("certOrbit.tl15V") },
    {
      type: "photo",
      src: "/products/black/01-torvault-black-front-closed.jpg",
      alt: "Torvault safe, black finish",
      k: t("certOrbit.blackFinishK"),
      v: "BF‑914",
    },
    { type: "seal", glyph: "30", k: t("certOrbit.tl30K"), v: t("certOrbit.tl30V") },
    {
      type: "photo",
      src: "/products/graphite/02-torvault-front-open.jpg",
      alt: "Torvault safe interior, shelf and boltwork",
      k: t("certOrbit.interiorViewK"),
      v: t("certOrbit.interiorViewV"),
    },
    { type: "seal", glyph: "III", k: t("certOrbit.en1143K"), v: t("certOrbit.en1143V") },
    {
      type: "photo",
      src: "/products/black/05-torvault-black-interior-detail.jpg",
      alt: "Torvault boltwork detail, black finish",
      k: t("certOrbit.boltworkDetailK"),
      v: t("certOrbit.boltworkDetailV"),
    },
  ];

  const TESTIMONIALS = [
    { name: "Chris Kay", quote: t("testimonials.quote1"), when: t("testimonials.when1") },
    { name: "Jack C.", quote: t("testimonials.quote2"), when: t("testimonials.when2") },
    { name: "Al F.", quote: t("testimonials.quote3"), when: t("testimonials.when3") },
  ];

  const homeFaqs = [
    {
      question: t("faqSection.q1"),
      answer: interpolateNodes(t.raw("faqSection.a1"), {
        certifiedStandardLink: (
          <Link href="/certified-standard" style={{ textDecoration: "underline" }}>
            {t("faqSection.a1LinkText")}
          </Link>
        ),
      }),
    },
    {
      question: t("faqSection.q2"),
      answer: interpolateNodes(t.raw("faqSection.a2"), {
        productsLink: (
          <Link href="/products" style={{ textDecoration: "underline" }}>
            {t("faqSection.a2LinkText")}
          </Link>
        ),
      }),
    },
    {
      question: t("faqSection.q3"),
      answer: interpolateNodes(t.raw("faqSection.a3"), {
        findDealerLink: (
          <Link href="/find-a-dealer" style={{ textDecoration: "underline" }}>
            {t("faqSection.a3LinkText1")}
          </Link>
        ),
        dealerProgramLink: (
          <Link href="/dealers" style={{ textDecoration: "underline" }}>
            {t("faqSection.a3LinkText2")}
          </Link>
        ),
      }),
    },
    { question: t("faqSection.q4"), answer: t("faqSection.a4") },
    { question: t("faqSection.q5"), answer: t("faqSection.a5") },
    {
      question: t("faqSection.q6"),
      answer: interpolateNodes(t.raw("faqSection.a6"), {
        productsLink: (
          <Link href="/products" style={{ textDecoration: "underline" }}>
            {t("faqSection.a2LinkText")}
          </Link>
        ),
      }),
    },
  ];

  // Plain-text duplicate of homeFaqs for FAQPage structured data — JSON-LD
  // needs a string, not the JSX produced by interpolateNodes, so link
  // placeholders are swapped for their visible link text instead of left
  // as raw `{token}` markers.
  const plainAnswer = (raw: string, links: Record<string, string>) =>
    raw.replace(/\{([a-zA-Z0-9]+)\}/g, (_, key) => links[key] ?? "");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        q: t("faqSection.q1"),
        a: plainAnswer(t.raw("faqSection.a1"), { certifiedStandardLink: t("faqSection.a1LinkText") }),
      },
      {
        q: t("faqSection.q2"),
        a: plainAnswer(t.raw("faqSection.a2"), { productsLink: t("faqSection.a2LinkText") }),
      },
      {
        q: t("faqSection.q3"),
        a: plainAnswer(t.raw("faqSection.a3"), {
          findDealerLink: t("faqSection.a3LinkText1"),
          dealerProgramLink: t("faqSection.a3LinkText2"),
        }),
      },
      { q: t("faqSection.q4"), a: t("faqSection.a4") },
      { q: t("faqSection.q5"), a: t("faqSection.a5") },
      {
        q: t("faqSection.q6"),
        a: plainAnswer(t.raw("faqSection.a6"), { productsLink: t("faqSection.a2LinkText") }),
      },
    ].map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="hero">
        <HeroVideo />
        <div className="wrap hero-grid">
          <span className="eyebrow hero-kicker">{t("hero.kicker")}</span>
          <h1 className="hero-headline">
            <span className="word-mask">
              <span className="word" style={{ "--wi": 0 } as React.CSSProperties}>
                {t("hero.word1")}
              </span>
            </span>{" "}
            <span className="word-mask">
              <span className="word" style={{ "--wi": 1 } as React.CSSProperties}>
                {t("hero.word2")}
              </span>
            </span>{" "}
            <span className="word-mask">
              <span className="word" style={{ "--wi": 2 } as React.CSSProperties}>
                {t("hero.word3")}
              </span>
            </span>
          </h1>
          <div className="hero-ctas">
            <NeuralButton href="/products" accent="gold">
              {t("hero.viewProducts")}
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
          {t("hero.scroll")}
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
            <span>{t("trustBar.item1")}</span>
          </NeuralButton>
          <NeuralButton accent="ice" className="trust-pill">
            <span className="trust-item-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="5.5" />
                <path d="M8.5 12.5L7 21l5-2.5 5 2.5-1.5-8.5" />
              </svg>
            </span>
            <span>{t("trustBar.item2")}</span>
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
            <span>{t("trustBar.item3")}</span>
          </NeuralButton>
        </div>
      </section>

      <section className="story-strip">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">{t("story.eyebrow")}</span>
            <h2>{t("story.heading")}</h2>
            <p>{t("story.body")}</p>
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
            <span className="eyebrow">{t("productsSection.eyebrow")}</span>
            <h2>{t("productsSection.heading")}</h2>
            <p>{t("productsSection.body")}</p>
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
              {t("certified.eyebrow")}
            </span>
            <h2>{t("certified.heading")}</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>{t("certified.body")}</p>
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
              {t("certified.cta")}
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
              {t("faqSection.eyebrow")}
            </span>
            <h2>{t("faqSection.heading")}</h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={homeFaqs} />
          </Reveal>
          <p style={{ textAlign: "center", marginTop: 36 }}>
            <Link className="cat-cta" href="/faq">
              {t("faqSection.viewAll")}
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
              {t("testimonials.eyebrow")}
            </span>
            <h2>{t("testimonials.heading")}</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>{t("testimonials.body")}</p>
          </Reveal>

          <div className="notebook-grid">
            {TESTIMONIALS.map((item, i) => (
              <Reveal as="article" className="notebook-note" delay={i * 120} key={item.name}>
                <span className="notebook-note-pin" aria-hidden="true" />
                <p className="notebook-note-quote">&ldquo;{item.quote}&rdquo;</p>
                <p className="notebook-note-sig">{item.name}</p>
                <span className="notebook-note-source">
                  {t("testimonials.googleReview")} &middot; {item.when}
                </span>
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
              {t("newsletter.eyebrow")}
            </span>
            <h2>{t("newsletter.heading")}</h2>
            <p>{t("newsletter.body")}</p>
            <NewsletterForm />
            <p className="form-note">
              {interpolateNodes(t.raw("newsletter.formNote"), {
                termsLink: (
                  <Link href="/terms" style={{ textDecoration: "underline" }}>
                    {t("newsletter.termsLinkText")}
                  </Link>
                ),
              })}
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
