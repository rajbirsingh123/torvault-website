"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dims, type SafeModel } from "@/lib/safes";

export default function ProductBuyBox({
  models,
  seriesLabel,
}: {
  models: SafeModel[];
  seriesLabel: string;
}) {
  const [selected, setSelected] = useState(models[0].model);
  const model = models.find((m) => m.model === selected) ?? models[0];

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("model");
    if (requested && models.some((m) => m.model === requested)) {
      setSelected(requested);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subject = encodeURIComponent(
    `Torvault ${model.model} — Spec Sheet & Quote Request`
  );
  const body = encodeURIComponent(
    `Hi Torvault team,\n\nPlease send pricing and availability for the ${model.model} (${seriesLabel} series).\n\nBusiness name:\nRegion:\n`
  );
  const quoteHref = `mailto:Sales@TorontoSafes.ca?subject=${subject}&body=${body}`;

  return (
    <div className="pdp-buybox">
      <div className="pdp-configurator">
        <label className="pdp-size-label" htmlFor="pdp-size-select">
          Choose a Size &mdash; {models.length} available
        </label>
        <div className="pdp-select-wrap">
          <select
            id="pdp-size-select"
            className="pdp-size-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {models.map((m) => (
              <option key={m.model} value={m.model}>
                {m.model} — {dims(m.outsideH, m.outsideW, m.outsideD)} — {m.weight.toLocaleString()} lbs
              </option>
            ))}
          </select>
        </div>

        <div className="pdp-size-stats">
          <div className="cell">
            <div className="v">{dims(model.outsideH, model.outsideW, model.outsideD)}</div>
            <div className="k">Outside Dimensions</div>
          </div>
          <div className="cell">
            <div className="v">{dims(model.insideH, model.insideW, model.insideD)}</div>
            <div className="k">Inside Dimensions</div>
          </div>
          <div className="cell">
            <div className="v">{model.weight.toLocaleString()} lbs</div>
            <div className="k">Weight</div>
          </div>
          <div className="cell">
            <div className="v">{model.capacity.toFixed(2)} ft&sup3;</div>
            <div className="k">Capacity</div>
          </div>
        </div>
      </div>

      <div className="pdp-cta-row">
        <a className="btn btn-primary" href={quoteHref}>
          Request a Quote — {model.model}
        </a>
        <Link className="btn btn-ghost" href="/find-a-dealer">
          Find a Dealer
        </Link>
      </div>

      <ul className="pdp-trust-row">
        <li className="pdp-trust-item">
          <span className="pdp-trust-item-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
            </svg>
          </span>
          <span>
            <span className="t">UL-Documented Rating</span>
            <span className="s">Independently tested, not a marketing tier</span>
          </span>
        </li>
        <li className="pdp-trust-item">
          <span className="pdp-trust-item-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
          </span>
          <span>
            <span className="t">Dealer-Exclusive Pricing</span>
            <span className="s">No public pricing, no direct-to-consumer sales</span>
          </span>
        </li>
        <li className="pdp-trust-item">
          <span className="pdp-trust-item-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M8 12.5l2.5 2.5L16 9.5" />
            </svg>
          </span>
          <span>
            <span className="t">ISO 9001:2015 Manufacturing</span>
            <span className="s">Certified quality management system</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
