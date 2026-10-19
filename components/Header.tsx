"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/nav";
import { SERIES_LIST, modelsBySeries, type SafeSeries } from "@/lib/safes";
import { getSeriesContent } from "@/lib/safes-i18n";
import SiteSearch from "@/components/SiteSearch";
import FavoritesPanel from "@/components/FavoritesPanel";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowForwardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const tp = useTranslations("products");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [expandedSeries, setExpandedSeries] = useState<SafeSeries | null>(null);
  const [mobileExpandedSeries, setMobileExpandedSeries] = useState<SafeSeries | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
    setExpandedSeries(null);
    setMobileExpandedSeries(null);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setDesktopDropdown(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDesktopDropdown(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className={`site-nav${open ? " is-open" : ""}`}>
      <div className="wrap nav-row">
        <Link href="/" className="nav-brand" aria-label="Torvault home">
          <Image
            src="/logo-horizontal-white.png"
            alt="Torvault Safe Company"
            height={30}
            width={196}
            style={{ width: "auto" }}
            priority
          />
        </Link>
        <ul className="nav-links" ref={navRef}>
          {NAV_LINKS.map((link) => {
            const key = link.href ?? link.labelKey;

            if (link.mega) {
              return (
                <li
                  key={key}
                  className="nav-item-dropdown nav-item-mega"
                  onMouseLeave={() => setExpandedSeries(null)}
                >
                  <Link
                    href={link.href!}
                    className="nav-dropdown-trigger"
                    aria-current={isActive(link.href!) ? "page" : undefined}
                  >
                    {t(link.labelKey)}
                    <ChevronIcon />
                  </Link>
                  <div className="nav-dropdown-menu mega" role="menu" aria-label={t("products")}>
                    <div className="nav-mega-list">
                      {SERIES_LIST.map((series) => {
                        const content = getSeriesContent(tp, series);
                        const isActiveSeries = expandedSeries === series;
                        return (
                          <div
                            className={`nav-mega-col${isActiveSeries ? " is-active" : ""}`}
                            key={series}
                          >
                            <div className="nav-mega-col-head">
                              <Link
                                href={`/products/${content.slug}`}
                                className="nav-mega-col-title"
                                aria-current={isActive(`/products/${content.slug}`) ? "page" : undefined}
                              >
                                {content.label}
                              </Link>
                              <button
                                type="button"
                                className="nav-mega-col-toggle"
                                aria-label={content.label}
                                aria-expanded={isActiveSeries}
                                onMouseEnter={() => setExpandedSeries(series)}
                                onFocus={() => setExpandedSeries(series)}
                              >
                                <ArrowForwardIcon />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {expandedSeries && (() => {
                      const content = getSeriesContent(tp, expandedSeries);
                      const models = modelsBySeries(expandedSeries);
                      return (
                        <div className="nav-mega-flyout" key={expandedSeries}>
                          <span className="nav-mega-flyout-title">{content.label}</span>
                          <div className="nav-mega-col-models">
                            {models.map((m) => (
                              <Link
                                key={m.model}
                                href={`/products/${content.slug}?model=${m.model}`}
                                className="nav-mega-size-link"
                              >
                                {m.model}
                                <span className="nav-mega-size-meta">{m.weight.toLocaleString()} {t("lbs")}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </li>
              );
            }

            if (!link.children) {
              return (
                <li key={key}>
                  <Link
                    href={link.href!}
                    aria-current={isActive(link.href!) ? "page" : undefined}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              );
            }

            const childActive = link.children.some((child) => isActive(child.href));
            return (
              <li
                key={key}
                className={`nav-item-dropdown${desktopDropdown === key ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className="nav-dropdown-trigger"
                  aria-haspopup="true"
                  aria-expanded={desktopDropdown === key}
                  aria-current={childActive ? "page" : undefined}
                  onClick={() =>
                    setDesktopDropdown((prev) => (prev === key ? null : key))
                  }
                >
                  {t(link.labelKey)}
                  <ChevronIcon />
                </button>
                <ul className="nav-dropdown-menu">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        className="nav-dropdown-link"
                        href={child.href}
                        aria-current={isActive(child.href) ? "page" : undefined}
                      >
                        {t(child.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <SiteSearch />
        <FavoritesPanel />
        <a href="tel:+18778875620" className="nav-phone">
          <span className="nav-phone-icon">
            <PhoneIcon />
          </span>
          1-877-887-5620
        </a>
        <LanguageSwitcher />
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            className="icon-open"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          <svg
            className="icon-close"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <nav className="mobile-menu" id="mobile-menu">
        <ul className="wrap">
          {NAV_LINKS.map((link) => {
            const key = link.href ?? link.labelKey;

            if (link.mega) {
              return (
                <li key={key} className="mobile-menu-item-dropdown">
                  <div className="mobile-row-split">
                    <Link
                      href={link.href!}
                      aria-current={isActive(link.href!) ? "page" : undefined}
                    >
                      {t(link.labelKey)}
                    </Link>
                    <button
                      type="button"
                      className={`mobile-dropdown-trigger-icon${mobileDropdown === key ? " is-open" : ""}`}
                      aria-haspopup="true"
                      aria-expanded={mobileDropdown === key}
                      aria-label={`Toggle ${t(link.labelKey)} sizes`}
                      onClick={() => {
                        setMobileDropdown((prev) => (prev === key ? null : key));
                        setMobileExpandedSeries(null);
                      }}
                    >
                      <ChevronIcon />
                    </button>
                  </div>
                  {mobileDropdown === key && (
                    <div className="mobile-submenu mobile-submenu-mega">
                      {SERIES_LIST.map((series) => {
                        const content = getSeriesContent(tp, series);
                        const models = modelsBySeries(series);
                        const isExpanded = mobileExpandedSeries === series;
                        return (
                          <div
                            className={`mobile-mega-group${isExpanded ? " is-expanded" : ""}`}
                            key={series}
                          >
                            <div className="mobile-row-split mobile-mega-group-head">
                              <Link
                                href={`/products/${content.slug}`}
                                className="mobile-mega-group-title"
                                aria-current={isActive(`/products/${content.slug}`) ? "page" : undefined}
                              >
                                {content.label}
                              </Link>
                              <button
                                type="button"
                                className={`mobile-dropdown-trigger-icon${isExpanded ? " is-open" : ""}`}
                                aria-expanded={isExpanded}
                                aria-label={content.label}
                                onClick={() =>
                                  setMobileExpandedSeries((prev) => (prev === series ? null : series))
                                }
                              >
                                <ChevronIcon />
                              </button>
                            </div>
                            {isExpanded && (
                              <ul>
                                {models.map((m) => (
                                  <li key={m.model}>
                                    <Link href={`/products/${content.slug}?model=${m.model}`}>
                                      {m.model}
                                      <span>{m.weight.toLocaleString()} {t("lbs")}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            }

            if (!link.children) {
              return (
                <li key={key}>
                  <Link
                    href={link.href!}
                    aria-current={isActive(link.href!) ? "page" : undefined}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              );
            }

            const childActive = link.children.some((child) => isActive(child.href));
            return (
              <li key={key} className="mobile-menu-item-dropdown">
                <button
                  type="button"
                  className={`mobile-dropdown-trigger${mobileDropdown === key ? " is-open" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={mobileDropdown === key}
                  aria-current={childActive ? "page" : undefined}
                  onClick={() =>
                    setMobileDropdown((prev) => (prev === key ? null : key))
                  }
                >
                  {t(link.labelKey)}
                  <ChevronIcon />
                </button>
                {mobileDropdown === key && (
                  <ul className="mobile-submenu">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={isActive(child.href) ? "page" : undefined}
                        >
                          {t(child.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
