import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Certified Standard | UL Fire & Burglary Ratings Explained — Torvault",
  description:
    "What TL-15, TL-30, and factory fire ratings actually mean — testing methodology, tools used, net working time, and why insurers rely on them.",
  alternates: { canonical: "/certified-standard" },
  openGraph: {
    type: "website",
    title: "Certified Standard | UL Fire & Burglary Ratings Explained",
    description:
      "What TL-15, TL-30, and factory fire ratings actually mean, and how UL testing works.",
    images: ["/safe-tl30.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function CertifiedStandardPage() {
  return (
    <main>
      <PageHero crumb="Certified Standard" eyebrow="Certified Standard" title="Every rating, explained.">
        UL ratings aren&rsquo;t marketing &mdash; they&rsquo;re independently
        tested with real tools and a stopwatch. Here&rsquo;s what each
        classification on a Torvault spec plate means.
      </PageHero>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">How UL Testing Works</span>
            <h2>Net working time, not wall-clock time.</h2>
            <p>
              Underwriters Laboratories (UL) certifies safes by having
              trained technicians &mdash; effectively professional
              safecrackers &mdash; attack a production unit with a defined
              kit of tools. The result is measured in{" "}
              <strong style={{ color: "var(--text)" }}>
                net working time
              </strong>
              : the clock only runs while a tool is actively working the
              safe, and stops the instant it&rsquo;s removed. A safe
              doesn&rsquo;t pass by surviving an hour in a workshop &mdash;
              it passes by resisting a fixed amount of continuous, focused
              attack.
            </p>
          </Reveal>

          <div className="term-grid">
            <div className="term-card" id="entry">
              <span className="term-label">Medium Level</span>
              <h3>Factory Fire Tested</h3>
              <p>
                Torvault&rsquo;s Fire &amp; Burglary line&rsquo;s baseline
                burglary resistance, verified in-house against common
                mechanical tools &mdash; not a UL-certified classification
                like TL&#8209;15 or TL&#8209;30.
              </p>
              <ul>
                <li>5 minutes net working time</li>
                <li>Tested on all sides, not just the door</li>
                <li>Common mechanical hand tools only</li>
                <li>Combination or keypad lock</li>
              </ul>
            </div>
            <div className="term-card" id="tl-15">
              <span className="term-label">High Security</span>
              <h3>UL TL&#8209;15</h3>
              <p>
                Tool-resistant, 15-minute rating &mdash; the standard behind
                most Canadian bank branches and pharmacy safes.
              </p>
              <ul>
                <li>15 minutes net working time, door only</li>
                <li>Hand tools, drills, punches, hammers</li>
                <li>Pressure-applying devices permitted</li>
                <li>Up to 200 lbs / freestanding not required</li>
              </ul>
            </div>
            <div className="term-card" id="tl-30">
              <span className="term-label">Maximum Security</span>
              <h3>UL TL&#8209;30</h3>
              <p>
                The rating behind Torvault&rsquo;s flagship line &mdash;
                same tool kit as TL&#8209;15, plus power tools, on all six
                sides.
              </p>
              <ul>
                <li>30 minutes net working time</li>
                <li>Tested on the body, not just the door</li>
                <li>Adds abrasive cutting wheels &amp; power saws</li>
                <li>High-speed carbide drills, cutting torches</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="fire">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Fire Endurance Testing</span>
            <h2>What survives a 1,700&deg;F furnace.</h2>
            <p>
              Fire endurance testing is the standard methodology for record
              and data protection equipment. A locked safe is placed inside an
              industrial furnace that follows a controlled
              time-temperature curve reaching up to 1,700&deg;F, while
              sensors continuously log the internal temperature. The safe
              fails the instant the interior exceeds its class threshold
              &mdash; anywhere inside the chamber.
            </p>
          </Reveal>
          <div className="icon-grid">
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2c2 4-2 5-2 8a2 2 0 004 0c1 2 0 4-2 6-3-1-5-4-5-7 0-3 2-5 5-7z" />
                </svg>
              </span>
              <h4>Class 350</h4>
              <p>
                Interior stays below 350&deg;F &mdash; the temperature at
                which paper begins to char. The standard for document and
                cash protection.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2c2 4-2 5-2 8a2 2 0 004 0c1 2 0 4-2 6-3-1-5-4-5-7 0-3 2-5 5-7z" />
                </svg>
              </span>
              <h4>Class 150</h4>
              <p>
                Interior stays below 150&deg;F &mdash; required for
                microfilm and other heat-sensitive media.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2c2 4-2 5-2 8a2 2 0 004 0c1 2 0 4-2 6-3-1-5-4-5-7 0-3 2-5 5-7z" />
                </svg>
              </span>
              <h4>Class 125</h4>
              <p>
                Interior stays below 125&deg;F &mdash; the tightest
                tolerance, for digital media, hard drives, and backup tape.
              </p>
            </div>
            <div className="icon-item">
              <span className="ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </span>
              <h4>Duration (&ldquo;&#8211;Hr&rdquo;)</h4>
              <p>
                Paired with the class, e.g.{" "}
                <strong style={{ color: "var(--text)" }}>
                  1&#8211;Hr / 350&deg;F
                </strong>{" "}
                &mdash; how long the safe holds its class rating inside the
                furnace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Side by Side</span>
            <h2>Every product line, one table.</h2>
          </Reveal>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Product Line</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Net Working Time</th>
                  <th scope="col">Tools Resisted</th>
                  <th scope="col">Fire Endurance</th>
                  <th scope="col">Steel Body</th>
                  <th scope="col">Typical Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Fire &amp; Burglary</th>
                  <td>Factory Fire Tested</td>
                  <td>5 min, all sides</td>
                  <td>Common hand tools</td>
                  <td>1&#8211;Hr @ 350&deg;F</td>
                  <td>12 ga steel</td>
                  <td>Home &amp; retail offices</td>
                </tr>
                <tr>
                  <th scope="row">TL&#8209;15</th>
                  <td>UL TL&#8209;15</td>
                  <td>15 min, door only</td>
                  <td>+ Drills, punches, hammers</td>
                  <td>&mdash;</td>
                  <td>1&Prime; solid steel</td>
                  <td>Bank branches, pharmacies</td>
                </tr>
                <tr>
                  <th scope="row">TL&#8209;30</th>
                  <td>UL TL&#8209;30</td>
                  <td>30 min, six sides</td>
                  <td>+ Cutting wheels, saws, torches</td>
                  <td>&mdash;</td>
                  <td>1.5&Prime; solid steel</td>
                  <td>CIT depots, jewelers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="callout">
            <strong>Why it matters for insurance:</strong> Most commercial
            property and cash-in-transit policies in Canada set coverage
            limits directly against a safe&rsquo;s UL rating &mdash; a
            policy might cap cash coverage at $2,500 in an unrated
            container versus $50,000+ behind a UL TL&#8209;30 body. Before
            specifying a safe for a client, confirm the rating their
            insurer actually requires, not just what fits the budget.
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
            <h2>See the rating on the safe.</h2>
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
              href="/products"
            >
              View Products
            </Link>
            <Link
              className="btn"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
              href="/faq"
            >
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
