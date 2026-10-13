"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useFavorites, removeFavorite } from "@/lib/favorites";
import { SERIES_STRUCTURAL, SERIES_LIST, type SafeSeries } from "@/lib/safes";
import { getSeriesContent } from "@/lib/safes-i18n";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4.5 5.8 4c2-.3 3.9.6 5.2 2.3C12.3 4.6 14.2 3.7 16.2 4c3.5.5 5.3 3.8 3.8 7.2-2.5 4.7-10 9.3-10 9.3z" />
    </svg>
  );
}

export default function FavoritesPanel() {
  const t = useTranslations("favorites");
  const tp = useTranslations("products");
  const [open, setOpen] = useState(false);
  const favorites = useFavorites();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const items = favorites
    .filter((slug): slug is SafeSeries => SERIES_LIST.includes(slug as SafeSeries) && Boolean(SERIES_STRUCTURAL[slug as SafeSeries]))
    .map((slug) => getSeriesContent(tp, slug as SafeSeries));

  return (
    <>
      <button
        type="button"
        className="nav-favorites-trigger"
        aria-label={items.length ? `${t("viewFavorites")} (${items.length})` : t("viewFavorites")}
        onClick={() => setOpen(true)}
      >
        <HeartIcon filled={items.length > 0} />
        {items.length > 0 && <span className="nav-favorites-count">{items.length}</span>}
      </button>
      {open && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label={t("favorites")}>
          <div className="search-backdrop" onClick={() => setOpen(false)} />
          <div className="search-panel favorites-panel">
            <div className="search-field">
              <HeartIcon filled={false} />
              <span className="favorites-panel-title">
                {t("favorites")}{items.length > 0 ? ` (${items.length})` : ""}
              </span>
              <button type="button" className="search-close" aria-label={t("closeFavorites")} onClick={() => setOpen(false)} ref={closeRef}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            {items.length === 0 ? (
              <p className="product-search-empty">
                {t("emptyState")}
              </p>
            ) : (
              <ul className="search-results favorites-list">
                {items.map((content) => (
                  <li key={content.slug}>
                    <Link href={`/products/${content.slug}`} className="search-result" onClick={() => setOpen(false)}>
                      <span className="search-result-title">{content.label}</span>
                      <span className="search-result-desc">{content.badge}</span>
                    </Link>
                    <button
                      type="button"
                      className="favorites-remove"
                      aria-label={t("removeFromFavorites", { label: content.label })}
                      onClick={() => removeFavorite(content.slug)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
