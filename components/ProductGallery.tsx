"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import { SERIES_CONTENT, SERIES_LIST, type SafeSeries } from "@/lib/safes";
import { PHOTO_FINISHES, getFinishImages, type PhotoFinish } from "@/lib/gallery";

type Colorway = PhotoFinish;
const COLORWAYS: Record<Colorway, { label: string; swatch: string; images: { src: string; alt: string }[] }> =
  Object.fromEntries(
    PHOTO_FINISHES.map((f) => [f.id, { label: f.label, swatch: f.swatch, images: getFinishImages(f.id) }])
  ) as Record<Colorway, { label: string; swatch: string; images: { src: string; alt: string }[] }>;

export default function ProductGallery() {
  const [openSeries, setOpenSeries] = useState<SafeSeries | null>(null);
  const [colorway, setColorway] = useState<Colorway>("graphite");
  const [activeImage, setActiveImage] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  function openQuickView(series: SafeSeries, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setColorway("graphite");
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

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setActiveImage((i) => (i + 1) % 5);
      if (e.key === "ArrowLeft") setActiveImage((i) => (i + 4) % 5);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSeries]);

  const active = openSeries ? SERIES_CONTENT[openSeries] : null;
  const gallery = COLORWAYS[colorway].images;

  return (
    <>
      <div className="qv-grid">
        {SERIES_LIST.map((series, index) => {
          const content = SERIES_CONTENT[series];
          return (
            <button
              key={series}
              type="button"
              className="qv-tile"
              onClick={(e) => openQuickView(series, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="qv-tile-media">
                <span className="qv-tile-badge">{content.badge}</span>
                <span className="qv-tile-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Image
                  src={COLORWAYS.graphite.images[0].src}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="qv-tile-hover">
                  <span className="qv-tile-hover-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" />
                    </svg>
                  </span>
                  Quick View
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
                  View Full Specification &rarr;
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
                  key={gallery[activeImage].src}
                  src={gallery[activeImage].src}
                  alt={gallery[activeImage].alt}
                  fill
                  sizes="(max-width: 860px) 100vw, 46vw"
                  style={{ objectFit: "cover" }}
                  priority
                />
                <button
                  type="button"
                  className="qv-media-nav prev"
                  aria-label="Previous image"
                  onClick={() => setActiveImage((i) => (i + 4) % 5)}
                >
                  &#8249;
                </button>
                <button
                  type="button"
                  className="qv-media-nav next"
                  aria-label="Next image"
                  onClick={() => setActiveImage((i) => (i + 1) % 5)}
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
                    aria-selected={activeImage === i}
                    className={`qv-thumb${activeImage === i ? " active" : ""}`}
                    onClick={() => setActiveImage(i)}
                  >
                    <Image src={img.src} alt="" fill sizes="80px" style={{ objectFit: "cover" }} />
                  </button>
                ))}
              </div>
              <div className="qv-colorways" role="radiogroup" aria-label="Finish">
                {(Object.keys(COLORWAYS) as Colorway[]).map((key) => (
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
                <strong>Best for:</strong> {active.bestFor}
              </p>

              <div className="qv-actions">
                <Button href={`/products/${active.slug}`} variant="primary">
                  View Full Specification
                </Button>
                <Button href="/dealers" variant="outline">
                  Talk to the Dealer Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
