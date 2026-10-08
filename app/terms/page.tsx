import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions | Torvault Safe Company",
  description:
    "Terms and conditions for using torvaultsafe.com and for email and SMS marketing communications from Torvault Safe Company.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main>
      <PageHero crumb="Terms & Conditions" eyebrow="Legal" title="Terms & Conditions.">
        Last updated October 2026. Questions? Email{" "}
        <a href="mailto:info@torvaultsafe.com" style={{ color: "#fff", textDecoration: "underline" }}>
          info@torvaultsafe.com
        </a>
        .
      </PageHero>

      <section>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="about-copy">
            <h3>1. Overview</h3>
            <p>
              These terms govern your use of torvaultsafe.com and any email
              or SMS communications you opt into from Torvault Safe Company
              (&ldquo;Torvault,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), a
              brand of Security Lock &amp; Safe Inc. By submitting the sign-up
              form on this site, you agree to the terms below.
            </p>

            <h3>2. Site content</h3>
            <p>
              Specifications, images, and pricing on this site are provided
              for general information and are subject to change without
              notice. Torvault sells exclusively through authorized Canadian
              dealers; nothing on this site constitutes a direct offer of
              sale to consumers. See our{" "}
              <Link href="/dealers" style={{ textDecoration: "underline" }}>
                Dealer Program
              </Link>{" "}
              and{" "}
              <Link href="/find-a-dealer" style={{ textDecoration: "underline" }}>
                Find a Dealer
              </Link>{" "}
              pages for current dealer information.
            </p>

            <h3>3. Email marketing consent</h3>
            <p>
              If you provide your email address, you consent to receive
              marketing messages from Torvault, including product updates,
              dealer program news, and promotions. You may withdraw consent
              at any time using the unsubscribe link included in every email,
              or by emailing{" "}
              <a href="mailto:info@torvaultsafe.com" style={{ textDecoration: "underline" }}>
                info@torvaultsafe.com
              </a>
              .
            </p>

            <h3>4. SMS marketing consent</h3>
            <p>
              If you provide your phone number, you agree to receive
              recurring marketing text messages from Torvault Safe Company at
              the number provided, sent using an automated system. Consent to
              receive texts is not a condition of any purchase. Message
              frequency varies. Message and data rates may apply. Reply{" "}
              <strong>HELP</strong> for help or <strong>STOP</strong> to
              cancel at any time; after you text STOP, we will send a final
              confirming message and send you no further messages.
            </p>

            <h3>5. Privacy</h3>
            <p>
              We use the contact information you provide only to send the
              communications you&rsquo;ve opted into and to respond to your
              inquiries. We do not sell your personal information to third
              parties. You may request access to, correction of, or deletion
              of your information at any time by emailing{" "}
              <a href="mailto:info@torvaultsafe.com" style={{ textDecoration: "underline" }}>
                info@torvaultsafe.com
              </a>
              .
            </p>

            <h3>6. Changes to these terms</h3>
            <p>
              We may update these terms from time to time; the
              &ldquo;last updated&rdquo; date above reflects the most recent
              revision. Continued use of this site or continued opt-in to our
              communications after a change constitutes acceptance of the
              updated terms.
            </p>

            <h3>7. Contact</h3>
            <p>
              Security Lock &amp; Safe Inc., operating as Torvault Safe
              Company. Email{" "}
              <a href="mailto:info@torvaultsafe.com" style={{ textDecoration: "underline" }}>
                info@torvaultsafe.com
              </a>{" "}
              or call{" "}
              <a href="tel:+18778875620" style={{ textDecoration: "underline" }}>
                1-877-887-5620
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
