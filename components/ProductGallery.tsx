"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SERIES_LIST, type SafeSeries } from "@/lib/safes";
import { getSeriesContent } from "@/lib/safes-i18n";
import { PHOTO_FINISHES, getFinishImages, type PhotoFinish } from "@/lib/gallery";

// per-series overrides for the homepage grid tile image, where a series
// has its own hero shot instead of the shared graphite/black finish photos
const TILE_IMAGE_OVERRIDE: Partial<Record<SafeSeries, string>> = {
  "fire-burglary": "/products/fire-burglary-hero.jpg",
  tl15: "/products/tl-black-hero-v2.jpg",
  tl30: "/products/tl-black-hero-v2.jpg",
};

type Colorway = PhotoFinish;
const COLORWAYS: Record<Colorway, { label: string; swatch: string; images: { src: string; alt: string }[] }> =
  Object.fromEntries(
    PHOTO_FINISHES.map((f) => [f.id, { label: f.label, swatch: f.swatch, images: getFinishImages(f.id) }])
  ) as Record<Colorway, { label: string; swatch: string; images: { src: string; alt: string }[] }>;

export default function ProductGallery() {
  const tp = useTranslations("products");
  const tc = useTranslations("common");
  const [openSeries, setOpenSeries] = useState<SafeSeries | null>(null);
  const [colorway, setColorway] = useState<Colorway>("graphite");
  const [activeImage, setActiveImage] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  function openQuickView(series: SafeSeries, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setColorway(series === "fire-burglary" ? "black" : "graphite");
    setActiveImage(0);
    setOpenSeries(series);
  }

  function close() {
    setOpenSeries(null);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!openSeries) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [openSeries]);

  // finishes don't all have the same shot count (black has one fewer than
  // graphite) — jumping to a shorter gallery while viewing a later photo
  // would otherwise index past the end, so snap back to the first shot
  useEffect(() => {
    setActiveImage(0);
  }, [colorway]);

  useEffect(() => {
    if (!openSeries) return;
    const len = COLORWAYS[colorway].images.length;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setActiveImage((i) => (i + 1) % len);
      if (e.key === "ArrowLeft") setActiveImage((i) => (i - 1 + len) % len);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSeries, colorway]);

  const active = openSeries ? getSeriesContent(tp, openSeries) : null;
  const gallery = COLORWAYS[colorway].images;
  // clamp synchronously at render time — switching finish can shrink the
  // gallery (black has one fewer shot than graphite), and that must never
  // leave activeImage pointing past the end before the reset effect runs
  const safeActiveImage = Math.min(activeImage, gallery.length - 1);
  // the Fire & Burglary line only ships in black — no finish choice to offer
  const availableFinishes = (Object.keys(COLORWAYS) as Colorway[]).filter(
    (key) => openSeries !== "fire-burglary" || key === "black"
  );

  return (
    <>
      <div className="qv-grid">
        {SERIES_LIST.map((series) => {
          const content = getSeriesContent(tp, series);
          return (
            <button
              key={series}
              type="button"
              className="qv-tile"
              onClick={(e) => openQuickView(series, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="qv-tile-media">
                <span className="qv-tile-media-inset padded">
                  <Image
                    src={
                      TILE_IMAGE_OVERRIDE[series] ??
                      COLORWAYS[series === "fire-burglary" ? "black" : "graphite"].images[0].src
                    }
                    alt={content.imageAlt}
                    fill
                    sizes="(max-width: 860px) 100vw, 33vw"
                    style={{ objectFit: "contain" }}
                  />
                </span>
                <span className="qv-tile-hover">
                  <span className="qv-tile-hover-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" />
                    </svg>
                  </span>
                  {tc("quickView")}
                </span>
              </span>
              <span className="qv-tile-body">
                <span className="qv-tile-rating">{content.chips[0]}</span>
                <h3 className="qv-tile-title">{content.label}</h3>
                <span className="qv-tile-specs">
                  {content.specCells.slice(0, 3).map((cell) => (
                    <span className="qv-tile-spec-row" key={cell.k}>
                      <span>{cell.k}</span>
                      <span>{cell.v}</span>
                    </span>
                  ))}
                </span>
                <span className="cat-cta" aria-hidden="true">
                  {tc("viewFullSpecification")} &rarr;
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {active && (
        <div
          className="qv-overlay"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="qv-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qv-title"
          >
            <button className="qv-close" type="button" aria-label="Close quick view" onClick={close} ref={closeRef}>
              &times;
            </button>

            <div className="qv-media-col">
              <div className="qv-media-main">
                <Image
                  key={gallery[safeActiveImage].src}
                  src={gallery[safeActiveImage].src}
                  alt={gallery[safeActiveImage].alt}
                  fill
                  sizes="(max-width: 860px) 100vw, 46vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <button
                  type="button"
                  className="qv-media-nav prev"
                  aria-label="Previous image"
                  onClick={() => setActiveImage((i) => (i - 1 + gallery.length) % gallery.length)}
                >
                  &#8249;
                </button>
                <button
                  type="button"
                  className="qv-media-nav next"
                  aria-label="Next image"
                  onClick={() => setActiveImage((i) => (i + 1) % gallery.length)}
                >
                  &#8250;
                </button>
              </div>
              <div className="qv-thumbs" role="tablist" aria-label="Product photos">
                {gallery.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    role="tab"
                    aria-selected={safeActiveImage === i}
                    className={`qv-thumb${safeActiveImage === i ? " active" : ""}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <Image src={img.src} alt="" fill sizes="80px" style={{ objectFit: "cover" }} />
                  </button>
                ))}
              </div>
              {availableFinishes.length > 1 && (
                <div className="qv-colorways" role="radiogroup" aria-label="Finish">
                  {availableFinishes.map((key) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={colorway === key}
                      className={`qv-swatch${colorway === key ? " active" : ""}`}
                      style={{ "--swatch": COLORWAYS[key].swatch } as React.CSSProperties}
                      onClick={() => setColorway(key)}
                    >
                      <span className="qv-swatch-dot" aria-hidden="true" />
                      {COLORWAYS[key].label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="qv-info-col">
              <span className="qv-tile-badge static">{active.badge}</span>
              <h2 id="qv-title" className="qv-title">{active.label}</h2>
              <div className="qv-chips">
                {active.chips.map((chip) => (
                  <span className="qv-chip" key={chip}>{chip}</span>
                ))}
              </div>
              <p className="qv-description">{active.intro[0]}</p>

              <div className="qv-spec-grid">
                {active.specCells.map((cell) => (
                  <div className="qv-spec-cell" key={cell.k}>
                    <span className="qv-spec-k">{cell.k}</span>
                    <span className="qv-spec-v">{cell.v}</span>
                  </div>
                ))}
              </div>

              <p className="qv-best-for">
                <strong>{tc("bestForLabel")}</strong> {active.bestFor}
              </p>

              <div className="qv-actions">
                <Button href={`/products/${active.slug}`} variant="primary">
                  {tc("viewFullSpecification")}
                </Button>
                <Button href="/dealers" variant="outline">
                  {tc("talkToDealerTeam")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
