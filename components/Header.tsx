"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";
import { SERIES_LIST, SERIES_CONTENT, modelsBySeries } from "@/lib/safes";
import SiteSearch from "@/components/SiteSearch";
import FavoritesPanel from "@/components/FavoritesPanel";

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
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
            style={{ height: 30, width: "auto" }}
            priority
          />
        </Link>
        <ul className="nav-links" ref={navRef}>
          {NAV_LINKS.map((link) => {
            const key = link.href ?? link.label;

            if (link.mega) {
              return (
                <li key={key} className="nav-item-dropdown nav-item-mega">
                  <Link
                    href={link.href!}
                    className="nav-dropdown-trigger"
                    aria-current={isActive(link.href!) ? "page" : undefined}
                  >
                    {link.label}
                    <ChevronIcon />
                  </Link>
                  <div className="nav-dropdown-menu mega" role="menu" aria-label="Products">
                    {SERIES_LIST.map((series) => {
                      const content = SERIES_CONTENT[series];
                      const models = modelsBySeries(series);
                      return (
                        <div className="nav-mega-col" key={series}>
                          <Link
                            href={`/products/${content.slug}`}
                            className="nav-mega-col-title"
                            aria-current={isActive(`/products/${content.slug}`) ? "page" : undefined}
                          >
                            {content.label}
                          </Link>
                          {models.map((m) => (
                            <Link
                              key={m.model}
                              href={`/products/${content.slug}?model=${m.model}`}
                              className="nav-mega-size-link"
                            >
                              {m.model}
                              <span className="nav-mega-size-meta">{m.weight.toLocaleString()} lbs</span>
                            </Link>
                          ))}
                        </div>
                      );
                    })}
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
                    {link.label}
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
                  {link.label}
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
                        {child.label}
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
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
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
            const key = link.href ?? link.label;

            if (link.mega) {
              return (
                <li key={key} className="mobile-menu-item-dropdown">
                  <div className="mobile-row-split">
                    <Link
                      href={link.href!}
                      aria-current={isActive(link.href!) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      className={`mobile-dropdown-trigger-icon${mobileDropdown === key ? " is-open" : ""}`}
                      aria-haspopup="true"
                      aria-expanded={mobileDropdown === key}
                      aria-label={`Toggle ${link.label} sizes`}
                      onClick={() =>
                        setMobileDropdown((prev) => (prev === key ? null : key))
                      }
                    >
                      <ChevronIcon />
                    </button>
                  </div>
                  {mobileDropdown === key && (
                    <div className="mobile-submenu mobile-submenu-mega">
                      {SERIES_LIST.map((series) => {
                        const content = SERIES_CONTENT[series];
                        const models = modelsBySeries(series);
                        return (
                          <div className="mobile-mega-group" key={series}>
                            <Link
                              href={`/products/${content.slug}`}
                              className="mobile-mega-group-title"
                              aria-current={isActive(`/products/${content.slug}`) ? "page" : undefined}
                            >
                              {content.label}
                            </Link>
                            <ul>
                              {models.map((m) => (
                                <li key={m.model}>
                                  <Link href={`/products/${content.slug}?model=${m.model}`}>
                                    {m.model}
                                    <span>{m.weight.toLocaleString()} lbs</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
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
                    {link.label}
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
                  {link.label}
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
                          {child.label}
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
