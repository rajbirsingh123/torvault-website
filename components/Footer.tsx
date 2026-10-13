import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

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
              style={{ width: "auto" }}
            />
            <p>{t("tagline")}</p>
          </div>
          <div className="footer-col">
            <h4>{t("productsHeading")}</h4>
            <ul>
              <li>
                <Link href="/products/fire-burglary">{t("fireBurglary")}</Link>
              </li>
              <li>
                <Link href="/products/tl15">{t("tl15")}</Link>
              </li>
              <li>
                <Link href="/products/tl30">{t("tl30")}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t("companyHeading")}</h4>
            <ul>
              <li>
                <Link href="/about">{t("aboutTorvault")}</Link>
              </li>
              <li>
                <Link href="/manufacturing">{t("manufacturing")}</Link>
              </li>
              <li>
                <Link href="/certified-standard">{t("certifiedStandard")}</Link>
              </li>
              <li>
                <Link href="/find-a-dealer">{t("findADealer")}</Link>
              </li>
              <li>
                <Link href="/dealers">{t("becomeADealer")}</Link>
              </li>
              <li>
                <Link href="/faq">{t("faq")}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t("contactHeading")}</h4>
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
            <h4>{t("backedByHeading")}</h4>
            <ul>
              <li style={{ color: "var(--text-muted)", fontSize: "13.5px" }}>
                {t("securityLockSafe")}
              </li>
              <li>
                <a href="https://torontosafes.ca/" target="_blank" rel="noopener">
                  {t("torontoSafes")}
                </a>
              </li>
              <li style={{ color: "var(--text-muted)", fontSize: "13.5px" }}>
                {t("servingGta")}
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t("copyright")}</span>
          <span>{t("motto")}</span>
        </div>
      </div>
    </footer>
  );
}
