"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, LOCALE_LABELS, type Locale } from "@/i18n/routing";

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function switchTo(nextLocale: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="lang-switcher" ref={wrapRef}>
      <button
        type="button"
        className="lang-switcher-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t("ariaLabel")}
        onClick={() => setOpen((prev) => !prev)}
      >
        <GlobeIcon />
        <span className="lang-switcher-current">{locale.toUpperCase()}</span>
      </button>
      {open && (
        <ul className="lang-switcher-menu" role="menu" aria-label={t("label")}>
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={l === locale}
                className={`lang-switcher-option${l === locale ? " active" : ""}`}
                onClick={() => switchTo(l)}
              >
                {LOCALE_LABELS[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
