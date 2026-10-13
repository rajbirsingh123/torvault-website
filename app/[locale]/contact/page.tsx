import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Support | Torvault Safe Company",
  description:
    "Reach Torvault for general inquiries, dealer-program questions, or product quotes — or find an authorized dealer for pricing and installation in your region.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact Torvault Support",
    description: "General inquiries, dealer-program questions, and quote requests.",
    images: ["/hero-safe.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero crumb="Contact" eyebrow="Contact Support" title="Get in touch.">
        Torvault sells exclusively through authorized Canadian dealers, so
        we&rsquo;ve laid out exactly who to reach below &mdash; whether
        you&rsquo;re a dealer, a business researching a purchase, or looking
        for help with a safe you already own.
      </PageHero>

      <section>
        <div className="wrap">
          <div className="contact-grid">
            <Reveal className="contact-card">
              <h3>General Inquiries</h3>
              <p>
                Questions about Torvault, our product lines, or anything not
                covered in the Help Center.
              </p>
              <div className="contact-card-links">
                <a href="mailto:info@torvaultsafe.com">info@torvaultsafe.com</a>
                <a href="tel:+18778875620">1-877-887-5620</a>
              </div>
            </Reveal>

            <Reveal className="contact-card" delay={60}>
              <h3>Become a Dealer</h3>
              <p>
                Apply to carry Torvault at wholesale with territory
                protection, or ask about the dealer program.
              </p>
              <div className="contact-card-links">
                <a href="mailto:dealers@torvaultsafe.com?subject=Torvault%20Dealer%20Inquiry">
                  dealers@torvaultsafe.com
                </a>
                <Link href="/dealers">Dealer Program details &rarr;</Link>
              </div>
            </Reveal>

            <Reveal className="contact-card" delay={120}>
              <h3>Pricing &amp; Quote Requests</h3>
              <p>
                Torvault doesn&rsquo;t publish pricing or sell direct &mdash;
                every quote runs through an authorized dealer who can speak
                to delivery and installation for your space.
              </p>
              <div className="contact-card-links">
                <Link href="/find-a-dealer">Find a Dealer near you &rarr;</Link>
              </div>
            </Reveal>

            <Reveal className="contact-card" delay={180}>
              <h3>Already a Toronto Safes Customer?</h3>
              <p>
                Torvault is manufactured by the team behind Toronto Safes,
                Security Lock &amp; Safe Inc.&rsquo;s retail arm in the GTA
                since 1987. Existing sales and service inquiries go directly
                to Toronto Safes.
              </p>
              <div className="contact-card-links">
                <a href="mailto:Sales@TorontoSafes.ca">Sales@TorontoSafes.ca</a>
                <a href="https://torontosafes.ca/" target="_blank" rel="noopener">
                  torontosafes.ca &rarr;
                </a>
              </div>
            </Reveal>
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
              Contact Us
            </span>
            <h2>Leave your message and we&rsquo;ll get back to you shortly.</h2>
          </Reveal>
          <ContactForm />
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="callout" style={{ maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            <strong>Looking for answers first?</strong> Most questions on
            ratings, sizing, and installation are already covered in our{" "}
            <Link href="/support" style={{ textDecoration: "underline" }}>
              Help Center
            </Link>{" "}
            and{" "}
            <Link href="/faq" style={{ textDecoration: "underline" }}>
              FAQ
            </Link>
            .
          </Reveal>
        </div>
      </section>
    </main>
  );
}
