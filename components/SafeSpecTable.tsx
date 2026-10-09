"use client";

import { useMemo, useState } from "react";
import { dims, quoteHref, type SafeModel } from "@/lib/safes";

type SortKey = "model" | "outsideH" | "weight" | "capacity";
type SortDir = "asc" | "desc";

export default function SafeSpecTable({
  models,
  seriesLabel,
}: {
  models: SafeModel[];
  seriesLabel: string;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("outsideH");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = useMemo(() => {
    const copy = [...models];
    copy.sort((a, b) => {
      const diff =
        sortKey === "model"
          ? a.model.localeCompare(b.model, undefined, { numeric: true })
          : a[sortKey] - b[sortKey];
      return sortDir === "asc" ? diff : -diff;
    });
    return copy;
  }, [models, sortKey, sortDir]);

  function SortHeader({ label, k }: { label: string; k: SortKey }) {
    const active = sortKey === k;
    return (
      <th scope="col">
        <button
          type="button"
          className={`th-sort${active ? " active" : ""}`}
          onClick={() => toggleSort(k)}
          aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
        >
          {label}
          <span className="sort-arrow" aria-hidden="true">
            {active ? (sortDir === "asc" ? "↑" : "↓") : "↕"}
          </span>
        </button>
      </th>
    );
  }

  return (
    <div className="table-wrap spec-table-wrap">
      <table className="spec-table">
        <thead>
          <tr>
            <SortHeader label="Model" k="model" />
            <SortHeader label="Outside H × W × D" k="outsideH" />
            <th scope="col">Inside H × W × D</th>
            <SortHeader label="Weight" k="weight" />
            <SortHeader label="Capacity" k="capacity" />
            <th scope="col" aria-hidden="true" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((m) => (
            <tr key={m.model}>
              <th scope="row">{m.model}</th>
              <td>{dims(m.outsideH, m.outsideW, m.outsideD)}</td>
              <td>{dims(m.insideH, m.insideW, m.insideD)}</td>
              <td>{m.weight.toLocaleString()} lbs</td>
              <td>{m.capacity.toFixed(2)} ft&sup3;</td>
              <td>
                <a className="spec-quote-link" href={quoteHref(m.model, seriesLabel)}>
                  Request Quote &rarr;
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
