"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import SafeSizeDiagram from "@/components/SafeSizeDiagram";
import SafeSpecTable from "@/components/SafeSpecTable";
import { dims, quoteHref, type SafeModel } from "@/lib/safes";

type Criteria = {
  needH: string;
  needW: string;
  needD: string;
  maxH: string;
  maxW: string;
  maxD: string;
  maxWeight: string;
};

const EMPTY_CRITERIA: Criteria = {
  needH: "",
  needW: "",
  needD: "",
  maxH: "",
  maxW: "",
  maxD: "",
  maxWeight: "",
};

function parseNum(v: string): number | null {
  if (v.trim() === "") return null;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Lets a customer describe what they actually need — what has to fit
 * inside, how much room there is for the safe itself, and any floor
 * weight limit — and filters the size lineup down to the models that
 * satisfy all of it, recommending the smallest (cheapest) one that does.
 * The form itself stays tucked behind a "Find Your Size" trigger and only
 * opens (as an animated modal) when a customer asks for it; the filtered
 * result stays applied to the diagram and table underneath after closing.
 * Falls back to showing the full catalog when no criteria are entered, or
 * when nothing in the line qualifies, so the diagram and table are never
 * left empty.
 */
export default function ModelLineup({
  models,
  seriesLabel,
}: {
  models: SafeModel[];
  seriesLabel: string;
}) {
  const [criteria, setCriteria] = useState<Criteria>(EMPTY_CRITERIA);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const active = Object.values(criteria).some((v) => v.trim() !== "");

  const matches = useMemo(() => {
    const needH = parseNum(criteria.needH);
    const needW = parseNum(criteria.needW);
    const needD = parseNum(criteria.needD);
    const maxH = parseNum(criteria.maxH);
    const maxW = parseNum(criteria.maxW);
    const maxD = parseNum(criteria.maxD);
    const maxWeight = parseNum(criteria.maxWeight);

    const filtered = models.filter((m) => {
      if (needH !== null && m.insideH < needH) return false;
      if (needW !== null && m.insideW < needW) return false;
      if (needD !== null && m.insideD < needD) return false;
      if (maxH !== null && m.outsideH > maxH) return false;
      if (maxW !== null && m.outsideW > maxW) return false;
      if (maxD !== null && m.outsideD > maxD) return false;
      if (maxWeight !== null && m.weight > maxWeight) return false;
      return true;
    });
    // smallest capacity that still satisfies every requirement — the most
    // cost-effective fit, not just the first one that happens to qualify
    return [...filtered].sort((a, b) => a.capacity - b.capacity);
  }, [criteria, models]);

  const best = matches[0] ?? null;
  const displayModels = active && matches.length > 0 ? matches : models;

  function update(key: keyof Criteria, value: string) {
    setCriteria((c) => ({ ...c, [key]: value }));
  }

  function reset() {
    setCriteria(EMPTY_CRITERIA);
  }

  function openFinder() {
    setOpen(true);
  }

  function closeFinder() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeFinder();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="lineup">
      <div className="finder-trigger-row">
        <button
          type="button"
          className={`finder-trigger${active ? " active" : ""}`}
          onClick={openFinder}
          ref={triggerRef}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M8 12h8M11 18h2" />
          </svg>
          Find Your Size
          {active && <span className="finder-trigger-badge">{matches.length}</span>}
        </button>
        {active && (
          <span className="finder-trigger-summary">
            {best ? `${matches.length} of ${models.length} models match` : "No matches for those requirements"}
            {" — "}
            <button type="button" className="finder-reset" onClick={reset}>
              Clear
            </button>
          </span>
        )}
      </div>

      {open && (
        <div
          className="qv-overlay"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeFinder();
          }}
        >
          <div className="finder-modal" role="dialog" aria-modal="true" aria-labelledby="finder-modal-title">
            <button className="qv-close" type="button" aria-label="Close" onClick={closeFinder} ref={closeRef}>
              &times;
            </button>

            <div className="finder-head">
              <h4 id="finder-modal-title">Find your size</h4>
              <p>Tell us what needs to fit inside and how much room you have for the safe itself.</p>
            </div>

            <div className="finder-grid">
              <div className="finder-group">
                <span className="finder-group-label">Needs to fit inside &mdash; min (in)</span>
                <div className="finder-row">
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="H"
                    value={criteria.needH}
                    onChange={(e) => update("needH", e.target.value)}
                    aria-label="Minimum interior height in inches"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="W"
                    value={criteria.needW}
                    onChange={(e) => update("needW", e.target.value)}
                    aria-label="Minimum interior width in inches"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="D"
                    value={criteria.needD}
                    onChange={(e) => update("needD", e.target.value)}
                    aria-label="Minimum interior depth in inches"
                  />
                </div>
              </div>

              <div className="finder-group">
                <span className="finder-group-label">Space available &mdash; max (in)</span>
                <div className="finder-row">
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="H"
                    value={criteria.maxH}
                    onChange={(e) => update("maxH", e.target.value)}
                    aria-label="Maximum outside height in inches"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="W"
                    value={criteria.maxW}
                    onChange={(e) => update("maxW", e.target.value)}
                    aria-label="Maximum outside width in inches"
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="D"
                    value={criteria.maxD}
                    onChange={(e) => update("maxD", e.target.value)}
                    aria-label="Maximum outside depth in inches"
                  />
                </div>
              </div>

              <div className="finder-group">
                <span className="finder-group-label">Floor weight limit (lbs)</span>
                <div className="finder-row">
                  <input
                    type="number"
                    min="0"
                    step="10"
                    placeholder="e.g. 500"
                    value={criteria.maxWeight}
                    onChange={(e) => update("maxWeight", e.target.value)}
                    aria-label="Maximum weight in pounds"
                  />
                </div>
              </div>
            </div>

            {active && (
              <div className="finder-result">
                {best ? (
                  <>
                    <span className="finder-result-count">
                      {matches.length} of {models.length} models match
                    </span>
                    <div className="finder-best">
                      <span className="finder-best-badge">Recommended</span>
                      <div className="finder-best-body">
                        <strong>{best.model}</strong>
                        <span>
                          {dims(best.outsideH, best.outsideW, best.outsideD)} outside &middot;{" "}
                          {best.weight.toLocaleString()} lbs
                        </span>
                      </div>
                      <Button href={quoteHref(best.model, seriesLabel)} variant="primary">
                        Request Quote &rarr;
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="finder-empty">
                    No model in this line fits those requirements.{" "}
                    <a href="/dealers">Talk to a dealer</a> about a custom fit.
                  </p>
                )}
                <button type="button" className="finder-reset" onClick={reset}>
                  Clear filters
                </button>
              </div>
            )}

            <button type="button" className="btn btn-grad finder-done" onClick={closeFinder}>
              {active && best ? "Show Results" : "Close"}
            </button>
          </div>
        </div>
      )}

      <SafeSizeDiagram models={displayModels} seriesLabel={seriesLabel} />
      <SafeSpecTable models={displayModels} seriesLabel={seriesLabel} />
    </div>
  );
}
