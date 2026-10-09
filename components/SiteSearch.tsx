"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NeuralBorder from "@/components/NeuralBorder";
import { searchSite, type SearchItem } from "@/lib/search-index";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    setResults(searchSite(query));
  }, [query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        className="nav-search-trigger"
        aria-label="Search the site"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </button>
      {open && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Site search">
          <div className="search-backdrop" onClick={() => setOpen(false)} />
          <div className="search-panel">
            <NeuralBorder accent="gold" radius={24} />
            <div className="search-field">
              <SearchIcon />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products, pages…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search"
              />
              <button type="button" className="search-close" aria-label="Close search" onClick={() => setOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            {query.trim() && (
              <ul className="search-results">
                {results.length === 0 ? (
                  <li className="search-empty">No results for &ldquo;{query}&rdquo;</li>
                ) : (
                  results.map((item) => (
                    <li key={`${item.href}-${item.title}`}>
                      <Link href={item.href} className="search-result" onClick={() => setOpen(false)}>
                        <span className="search-result-title">{item.title}</span>
                        <span className="search-result-desc">{item.description}</span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
