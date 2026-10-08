import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Image
              src="/logo-horizontal-white.png"
              alt="Torvault Safe Company"
              height={26}
              width={170}
              style={{ height: 26, width: "auto" }}
            />
            <p>
              High-security fire and burglary safes, engineered for the
              Canadian market and manufactured in Vietnam.
            </p>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li>
                <Link href="/products/fire-burglary">
                  Fire &amp; Burglary
                </Link>
              </li>
              <li>
                <Link href="/products/tl15">TL&#8209;15 High Security</Link>
              </li>
              <li>
                <Link href="/products/tl30">TL&#8209;30 High Security</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About Torvault</Link>
              </li>
              <li>
                <Link href="/manufacturing">Manufacturing</Link>
              </li>
              <li>
                <Link href="/certified-standard">Certified Standard</Link>
              </li>
              <li>
                <Link href="/find-a-dealer">Find a Dealer</Link>
              </li>
              <li>
                <Link href="/dealers">Become a Dealer</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:dealers@torvaultsafe.com">
                  dealers@torvaultsafe.com
                </a>
              </li>
              <li>
                <a href="mailto:info@torvaultsafe.com">
                  info@torvaultsafe.com
                </a>
              </li>
              <li>
                <a href="tel:+18778875620">1-877-887-5620</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Backed By</h4>
            <ul>
              <li style={{ color: "var(--text-muted)", fontSize: "13.5px" }}>
                Security Lock &amp; Safe Inc.
              </li>
              <li>
                <a href="https://torontosafes.ca/" target="_blank" rel="noopener">
                  Toronto Safes &rarr;
                </a>
              </li>
              <li style={{ color: "var(--text-muted)", fontSize: "13.5px" }}>
                Serving the GTA since 1987
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Torvault Safe Company. All rights reserved.</span>
          <span>
            Concept site &mdash; specifications illustrative pending final
            product certification.
          </span>
        </div>
      </div>
    </footer>
  );
}
