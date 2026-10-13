import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Help Center | Torvault Safe Company",
  description:
    "Find answers on UL ratings, sizing, shipping and installation, or get in touch with Torvault support and our authorized dealer network.",
  alternates: { canonical: "/support" },
  openGraph: {
    type: "website",
    title: "Torvault Help Center",
    description:
      "FAQs, sizing and installation guides, and how to reach Torvault support.",
    images: ["/hero-safe.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

const TOPICS = [
  {
    href: "/faq",
    title: "Frequently Asked Questions",
    body: "Answers on UL ratings, the dealer-only model, fire protection, and lead times.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 014.6 1.4c0 1.6-2.1 1.9-2.1 3.3M12 17h.01" />
      </svg>
    ),
  },
  {
    href: "/blog/choosing-the-right-safe-size",
    title: "Size & Capacity Guides",
    body: "How to size a safe against what you actually need to store — plus our interactive size finder.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20h16M6 20V9l6-5 6 5v11" />
        <path d="M10 20v-6h4v6" />
      </svg>
    ),
  },
  {
    href: "/blog/what-to-expect-at-delivery",
    title: "Shipping & Installation",
    body: "What to expect on delivery day, access-path planning, and how anchoring works.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="7" width="13" height="10" rx="1" />
        <path d="M14 10h4l4 3.5V17h-8z" />
        <circle cx="6" cy="19" r="1.6" />
        <circle cx="17.5" cy="19" r="1.6" />
      </svg>
    ),
  },
  {
    href: "/blog",
    title: "The Vault — Guides & Articles",
    body: "The full library of Torvault guides on ratings, fire protection, and buying the right safe.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 5a2 2 0 012-2h11a1 1 0 011 1v15a1 1 0 01-1 1H6a2 2 0 01-2-2V5z" />
        <path d="M4 18a2 2 0 002 2h11" />
      </svg>
    ),
  },
  {
    href: "/find-a-dealer",
    title: "Find a Dealer",
    body: "Locate an authorized Torvault dealer for pricing, delivery, and installation in your region.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    href: "/contact",
    title: "Contact Support",
    body: "General inquiries, dealer-program questions, and how to reach the right team.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 5h16v11H7l-3 3V5z" />
        <path d="M8 9h8M8 12.5h5" />
      </svg>
    ),
  },
];

export default function SupportPage() {
  return (
    <main>
      <PageHero crumb="Help Center" eyebrow="Help Center" title="How can we help?">
        Ratings, sizing, shipping, and installation &mdash; find it below, or{" "}
        <Link href="/contact" style={{ color: "#fff", textDecoration: "underline" }}>
          contact support
        </Link>{" "}
        directly.
      </PageHero>

      <section>
        <div className="wrap">
          <div className="icon-grid">
            {TOPICS.map((topic, i) => (
              <Reveal key={topic.href} delay={i * 60}>
                <Link href={topic.href} className="icon-item icon-item-link">
                  <span className="ico">{topic.icon}</span>
                  <h4>{topic.title}</h4>
                  <p>{topic.body}</p>
                </Link>
              </Reveal>
            ))}
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
              Still Need Help?
            </span>
            <h2>Talk to a person, not a ticket queue.</h2>
            <p style={{ marginLeft: "auto", marginRight: "auto" }}>
              Torvault is backed by Security Lock &amp; Safe Inc. &mdash; the
              same team that has answered the phone for Toronto Safes
              customers since 1987.
            </p>
          </Reveal>
          <div style={{ textAlign: "center" }}>
            <Link className="btn btn-grad" href="/contact">
              Contact Support &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
