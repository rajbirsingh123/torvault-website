"use client";

import { useEffect, useRef, useState } from "react";
import { dims, fmtIn, quoteHref, type SafeModel } from "@/lib/safes";

const PX_PER_INCH = 2.6;
const ZOOM_PX_PER_INCH = 7.4;
const HUMAN_HEIGHT_IN = 69; // ~5'9" average adult, shown for real-world scale

/**
 * A flat line-art safe silhouette, drawn in real inches (viewBox matches the
 * model's actual outside H × W) so every model in the row is rendered at
 * the same scale and sizes stay honestly comparable at a glance. The width
 * and height are set as the door's own dimension labels, scaling with the
 * box itself — the smallest models render too small to read until zoomed.
 */
function SafeIcon({ model, pxPerInch }: { model: SafeModel; pxPerInch: number }) {
  const w = model.outsideW;
  const h = model.outsideH;
  const stroke = Math.max(0.22, w * 0.01);
  const hingeW = Math.max(0.5, w * 0.045);
  const fontSize = Math.min(2.6, Math.max(1, Math.min(w, h) * 0.16));

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * pxPerInch}
      height={h * pxPerInch}
      role="img"
      aria-label={`${model.model}, ${dims(model.outsideH, model.outsideW, model.outsideD)}`}
    >
      <rect
        x={stroke / 2}
        y={stroke / 2}
        width={w - stroke}
        height={h - stroke}
        rx={Math.min(1, w * 0.035)}
        fill="var(--card)"
        stroke="var(--text-muted)"
        strokeWidth={stroke}
      />
      <rect x={w - hingeW} y={h * 0.16} width={hingeW} height={h * 0.1} fill="var(--text-muted)" />
      <rect x={w - hingeW} y={h * 0.74} width={hingeW} height={h * 0.1} fill="var(--text-muted)" />
      <text
        x={w / 2}
        y={h / 2 - fontSize * 0.15}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight={700}
        fill="var(--text)"
      >
        {fmtIn(w)} W
      </text>
      <text
        x={w / 2}
        y={h / 2 + fontSize * 1.1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize * 0.88}
        fill="var(--text-muted)"
      >
        {fmtIn(h)} H
      </text>
    </svg>
  );
}

/**
 * Clean, well-proportioned standing-person pictogram — the same reference
 * style used on architectural and furniture scale diagrams — drawn at the
 * same inches-to-pixels scale as the safes so it's an honest height check,
 * not just a decoration.
 */
function HumanSilhouette() {
  const heightPx = HUMAN_HEIGHT_IN * PX_PER_INCH;
  const widthPx = heightPx * 0.34;
  return (
    <svg
      viewBox="0 0 34 100"
      width={widthPx}
      height={heightPx}
      role="img"
      aria-label={`Average adult, about 5'9" (${HUMAN_HEIGHT_IN}in), shown for scale`}
    >
      <g fill="var(--text-muted)" stroke="var(--text-muted)" strokeWidth={0.6} strokeLinejoin="round">
        <circle cx="17" cy="9" r="7.5" stroke="none" />
        <polygon points="8,23.5 26,23.5 23.5,53 29.5,96 20,96 17,63 14,96 4.5,96 10.5,53" />
      </g>
    </svg>
  );
}

/**
 * Side-by-side size lineup for a product line, every model and a human
 * reference figure standing on the same baseline at one consistent scale
 * — so a customer can see at a glance how a given model compares in size
 * to the others, and to themselves, before reading a single spec number.
 * Clicking any model zooms it into a focused card with the same figures
 * shown in the spec table below, for the sizes too small to read at a
 * glance in the row.
 */
export default function SafeSizeDiagram({
  models,
  seriesLabel,
}: {
  models: SafeModel[];
  seriesLabel: string;
}) {
  const sorted = [...models].sort((a, b) => a.outsideH - b.outsideH);
  const [zoomed, setZoomed] = useState<SafeModel | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  function openZoom(model: SafeModel, trigger: HTMLElement) {
    triggerRef.current = trigger;
    setZoomed(model);
  }

  function closeZoom() {
    setZoomed(null);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!zoomed) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeZoom();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomed]);

  return (
    <div className="size-diagram-wrap">
      <div className="size-diagram-row">
        {sorted.map((m) => (
          <button
            type="button"
            className="size-diagram-item"
            key={m.model}
            onClick={(e) => openZoom(m, e.currentTarget)}
          >
            <SafeIcon model={m} pxPerInch={PX_PER_INCH} />
            <span className="size-diagram-label">{m.model}</span>
            <span className="size-diagram-dims">{dims(m.outsideH, m.outsideW, m.outsideD)}</span>
          </button>
        ))}
        <div className="size-diagram-item size-diagram-human">
          <HumanSilhouette />
          <span className="size-diagram-label">5&prime;9&Prime;</span>
          <span className="size-diagram-dims">for scale</span>
        </div>
      </div>

      {zoomed && (
        <div
          className="qv-overlay"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeZoom();
          }}
        >
          <div className="size-zoom-modal" role="dialog" aria-modal="true" aria-labelledby="size-zoom-title">
            <button className="qv-close" type="button" aria-label="Close" onClick={closeZoom} ref={closeRef}>
              &times;
            </button>
            <div className="size-zoom-visual">
              <SafeIcon model={zoomed} pxPerInch={ZOOM_PX_PER_INCH} />
            </div>
            <div className="size-zoom-info">
              <h3 id="size-zoom-title">{zoomed.model}</h3>
              <div className="size-zoom-specs">
                <div className="row">
                  <span>Outside H &times; W &times; D</span>
                  <span>{dims(zoomed.outsideH, zoomed.outsideW, zoomed.outsideD)}</span>
                </div>
                <div className="row">
                  <span>Inside H &times; W &times; D</span>
                  <span>{dims(zoomed.insideH, zoomed.insideW, zoomed.insideD)}</span>
                </div>
                <div className="row">
                  <span>Weight</span>
                  <span>{zoomed.weight.toLocaleString()} lbs</span>
                </div>
                <div className="row">
                  <span>Capacity</span>
                  <span>{zoomed.capacity.toFixed(2)} ft&sup3;</span>
                </div>
              </div>
              <a className="btn btn-primary" href={quoteHref(zoomed.model, seriesLabel)}>
                Request Quote &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
