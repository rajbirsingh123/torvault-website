import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import FaqAccordion, { FaqEntry } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ | Torvault Safe Company",
  description:
    "Answers on UL safe ratings, fire vs. burglary protection, Torvault's dealer-only model, lead times, and how to become an authorized dealer.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    title: "Torvault FAQ",
    description: "Answers on UL safe ratings, Torvault's dealer-only model, and lead times.",
    images: ["/hero-safe.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

const generalFaqs: FaqEntry[] = [
  {
    question: "Is Torvault a currently certified, shipping product line?",
    answer: (
      <>
        Torvault is a new brand launching in 2026. Specifications shown
        across this site reflect our engineering targets and are
        illustrative pending final UL certification and production &mdash;
        we&rsquo;re upfront about that rather than implying certifications
        we don&rsquo;t yet hold. Confirmed dealers receive current
        certification status as part of onboarding.
      </>
    ),
  },
  {
    question: "How is Torvault different from Toronto Safes?",
    answer: (
      <>
        Toronto Safes is a retail provider, selling directly to homes and
        businesses across the GTA since 1987. Torvault is a new
        manufacturing brand from the same parent company, Security Lock
        &amp; Safe Inc. &mdash; built to supply independent safe dealers
        across Canada at wholesale, not to sell direct to consumers. See
        the full story on our{" "}
        <Link href="/about" style={{ textDecoration: "underline" }}>
          About page
        </Link>
        .
      </>
    ),
  },
  {
    question: "Is a “fireproof” safe actually fireproof?",
    answer: (
      <>
        No safe is truly fireproof &mdash; the correct term is{" "}
        <em>fire-resistant</em> or <em>fire-rated</em>. A rating like
        &ldquo;1&#8211;Hr / 350&deg;F&rdquo; means the interior stayed below
        350&deg;F for one hour inside a furnace that can reach 1,700&deg;F
        outside the safe &mdash; not that the contents are immune to fire
        indefinitely. Match the duration rating to your realistic
        fire-department response time.
      </>
    ),
  },
];

const ratingFaqs: FaqEntry[] = [
  {
    question: "What does a UL security rating actually mean?",
    answer: (
      <>
        UL (Underwriters Laboratories) independently tests safes against
        real tools &mdash; prybars, drills, saws, cutting torches &mdash;
        for a set net working time (the clock only runs while a tool is
        actively working the safe). A TL&#8209;15 safe resists a
        professional attack with common tools for 15 minutes; TL&#8209;30
        for 30, on every side. It&rsquo;s the same standard insurers use to
        set coverage limits. Full breakdown on our{" "}
        <Link href="/certified-standard" style={{ textDecoration: "underline" }}>
          Certified Standard page
        </Link>
        .
      </>
    ),
  },
  {
    question: "Does a higher burglary rating mean better fire protection?",
    answer: (
      <>
        No &mdash; burglary ratings (Fire &amp; Burglary, TL&#8209;15,
        TL&#8209;30) and fire ratings (measured in hours and maximum interior
        temperature) are tested completely independently. A high burglary
        rating says nothing about fire performance and vice versa. If you
        need both, confirm the safe carries a documented rating for each, not
        just one.
      </>
    ),
  },
];

const orderingFaqs: FaqEntry[] = [
  {
    question: "Do you sell direct to consumers?",
    answer: (
      <>
        No. Torvault sells exclusively through authorized Canadian dealers.
        If you&rsquo;re a homeowner or business looking to buy a safe
        directly, contact our sister company{" "}
        <a
          href="https://torontosafes.ca/"
          target="_blank"
          rel="noopener"
          style={{ textDecoration: "underline" }}
        >
          Toronto Safes
        </a>{" "}
        or ask us for a dealer referral in your region.
      </>
    ),
  },
  {
    question: "What are the lead times for Canadian delivery?",
    answer: (
      <>
        Torvault is in its first territory intake round for 2026. Confirmed
        dealers receive lead-time and inventory commitments as part of
        onboarding &mdash; request the dealer package on our{" "}
        <Link href="/dealers" style={{ textDecoration: "underline" }}>
          Dealer Program page
        </Link>{" "}
        for current timelines.
      </>
    ),
  },
  {
    question: "How do I become an authorized Torvault dealer?",
    answer: (
      <>
        Email{" "}
        <a
          href="mailto:dealers@torvaultsafe.com"
          style={{ textDecoration: "underline" }}
        >
          dealers@torvaultsafe.com
        </a>{" "}
        with your business name and region, or see the full application
        process on our{" "}
        <Link href="/dealers" style={{ textDecoration: "underline" }}>
          Dealer Program page
        </Link>
        . We&rsquo;ll send certified specification sheets, wholesale
        pricing, and territory availability.
      </>
    ),
  },
  {
    question: "Is territory exclusive to one dealer?",
    answer: (
      <>
        Territory protection is part of the dealer program &mdash; details
        and current availability by region are provided during onboarding,
        since Torvault is still in its first intake round. Reach out early
        to secure your area.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <main>
      <PageHero crumb="FAQ" eyebrow="FAQ" title="Frequently asked questions.">
        Ratings, sourcing, ordering, and how the dealer program works
        &mdash; if your question isn&rsquo;t here, email{" "}
        <a
          href="mailto:info@torvaultsafe.com"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          info@torvaultsafe.com
        </a>
        .
      </PageHero>

      <section>
        <div className="wrap">
          <p className="faq-group-label">General</p>
          <FaqAccordion items={generalFaqs} />

          <p className="faq-group-label">Ratings &amp; Certification</p>
          <FaqAccordion items={ratingFaqs} />

          <p className="faq-group-label">Ordering &amp; Dealers</p>
          <FaqAccordion items={orderingFaqs} />
        </div>
      </section>
    </main>
  );
}
