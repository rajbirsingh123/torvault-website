"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import NeuralBorder from "@/components/NeuralBorder";
import { searchProductsGrouped } from "@/lib/search-index";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const active = query.trim().length > 0;
  const { lines, modelGroups, total } = searchProductsGrouped(query);

  return (
    <div className="product-search">
      <div className="product-search-field">
        <NeuralBorder accent="gold" radius={16} />
        <SearchIcon />
        <input
          type="text"
          placeholder="Search by model number or line — e.g. TL-30, BF-914"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
        {active && (
          <button
            type="button"
            className="product-search-clear"
            aria-label="Clear search"
            onClick={() => setQuery("")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {active ? `${total} result${total === 1 ? "" : "s"} for ${query}` : ""}
      </p>
      {active && (
        <div className="product-search-results">
          {total === 0 ? (
            <div className="product-search-empty">
              <p>No models or lines match &ldquo;{query}&rdquo;.</p>
              <p>
                Try a model number like <strong>BF-914</strong> or{" "}
                <strong>30-2016</strong>, or{" "}
                <button type="button" className="product-search-reset" onClick={() => setQuery("")}>
                  browse all three lines below
                </button>
                .
              </p>
            </div>
          ) : (
            <>
              {lines.length > 0 && (
                <div className="product-search-group">
                  <span className="product-search-group-label">Product Lines</span>
                  <ul>
                    {lines.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="product-search-result">
                          <span className="product-search-result-title">{item.title}</span>
                          <span className="product-search-result-desc">{item.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {modelGroups.map((group) => (
                <div className="product-search-group" key={group.seriesLabel}>
                  <span className="product-search-group-label">{group.seriesLabel} Models</span>
                  <ul>
                    {group.models.map((item) => (
                      <li key={item.href + item.title}>
                        <Link href={item.href} className="product-search-result">
                          <span className="product-search-result-title">{item.title}</span>
                          <span className="product-search-result-desc">{item.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {group.totalCount > group.models.length && (
                    <Link href={group.seriesHref} className="product-search-more">
                      View all {group.totalCount} {group.seriesLabel} sizes &rarr;
                    </Link>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
