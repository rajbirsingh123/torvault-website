"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { dealers, DEALER_TAGS, TAG_STYLES, type Dealer } from "@/lib/dealers";
import { searchPlaces, distanceKm, formatDistanceKm, type GeoPoint } from "@/lib/geo";
import DealerMap from "@/components/DealerMap";

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.6 7-11.5A7 7 0 005 9.5C5 15.4 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function TagPill({ tag }: { tag: string }) {
  const style = TAG_STYLES[tag];
  return (
    <span
      className="dealer-tag"
      style={style ? { background: style.bg, color: style.text } : undefined}
    >
      {tag}
    </span>
  );
}

function DealerCard({ dealer, distance }: { dealer: Dealer; distance?: number }) {
  return (
    <article className="dealer-card">
      <div className="dealer-card-type">
        {dealer.dealerType.split(" ").map((word) => (
          <span key={word}>{word}</span>
        ))}
      </div>
      <div className="dealer-card-body">
        <div className="dealer-card-head">
          <h3>{dealer.name}</h3>
          {distance !== undefined && <span className="dealer-distance">{formatDistanceKm(distance)}</span>}
        </div>
        <div className="dealer-card-tags">
          {dealer.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        {dealer.description && <p className="dealer-card-desc">{dealer.description}</p>}
        <div className="dealer-card-meta">
          <span>{dealer.address}</span>
          <a href={dealer.phoneHref}>{dealer.phone}</a>
          {dealer.email && <a href={`mailto:${dealer.email}`}>{dealer.email}</a>}
          {dealer.website && (
            <a href={dealer.website} target="_blank" rel="noopener noreferrer">
              {dealer.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          )}
        </div>
        <a
          className="btn btn-primary dealer-card-directions"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.mapsQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </a>
      </div>
    </article>
  );
}

export default function DealerLocator() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<GeoPoint[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [location, setLocation] = useState<GeoPoint | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const skipNextFetch = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    const q = query.trim();
    if (q.length < 3) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setIsSearching(true);
      searchPlaces(q, controller.signal)
        .then((results) => {
          setSuggestions(results);
          setShowSuggestions(true);
        })
        .catch(() => {})
        .finally(() => setIsSearching(false));
    }, 450);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function selectPlace(place: GeoPoint) {
    skipNextFetch.current = true;
    setQuery(place.label);
    setLocation(place);
    setSuggestions([]);
    setShowSuggestions(false);
    setLocationError(null);
  }

  function clearLocation() {
    skipNextFetch.current = true;
    setQuery("");
    setLocation(null);
    setSuggestions([]);
    setLocationError(null);
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      setLocationError("Location services aren't available in this browser.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        skipNextFetch.current = true;
        setQuery("Your location");
        setLocation({ label: "Your location", lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocationError("We couldn't access your location. Try searching a city or postal code instead.");
        setLocating(false);
      },
      { timeout: 10000 }
    );
  }

  const results = useMemo(() => {
    const filtered = dealers.filter(
      (dealer) => activeTags.length === 0 || activeTags.some((tag) => dealer.tags.includes(tag))
    );
    if (!location) return filtered.map((dealer) => ({ dealer, distance: undefined as number | undefined }));
    return filtered
      .map((dealer) => ({ dealer, distance: distanceKm(location.lat, location.lon, dealer.lat, dealer.lon) }))
      .sort((a, b) => a.distance - b.distance);
  }, [activeTags, location]);

  return (
    <div className="locator">
      <div className="locator-controls">
        <div className="locator-search-wrap" ref={wrapRef}>
          <div className="locator-search-field">
            <PinIcon />
            <input
              type="text"
              className="locator-search"
              placeholder="Search by city, province, or postal code"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLocation(null);
              }}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              aria-label="Search for a Torvault dealer by location"
              autoComplete="off"
            />
            {query && (
              <button type="button" className="locator-search-clear" aria-label="Clear search" onClick={clearLocation}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            )}
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="locator-suggestions">
              {suggestions.map((s) => (
                <li key={`${s.lat},${s.lon}`}>
                  <button type="button" onClick={() => selectPlace(s)}>
                    <PinIcon />
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {showSuggestions && isSearching && suggestions.length === 0 && (
            <div className="locator-suggestions-status">Searching&hellip;</div>
          )}
        </div>
        <button type="button" className="locator-use-location" onClick={useMyLocation} disabled={locating}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
          {locating ? "Locating…" : "Use My Location"}
        </button>
        <div className="locator-filters" role="group" aria-label="Filter by service">
          {DEALER_TAGS.map((tag) => {
            const active = activeTags.includes(tag);
            const style = TAG_STYLES[tag];
            return (
              <button
                key={tag}
                type="button"
                className={`filter-chip${active ? " active" : ""}`}
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
                style={style ? { background: style.bg, color: style.text } : undefined}
              >
                <span className="filter-chip-box" style={style ? { color: style.bg } : undefined}>
                  {active && <CheckIcon />}
                </span>
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {locationError && <p className="locator-error">{locationError}</p>}

      {results.length > 0 ? (
        <div className="locator-layout">
          <div className="dealer-list">
            {results.map(({ dealer, distance }) => (
              <DealerCard key={dealer.id} dealer={dealer} distance={distance} />
            ))}
          </div>
          <DealerMap dealers={results.map((r) => r.dealer)} searchedLocation={location} />
        </div>
      ) : (
        <div className="dealer-empty">
          <h3>No Torvault dealers match those filters yet.</h3>
          <p>
            We&rsquo;re onboarding our first round of Canadian dealers right
            now &mdash; this list will grow as new territories open. If
            you&rsquo;re a retailer or locksmith interested in carrying
            Torvault, we&rsquo;d like to hear from you.
          </p>
          <Link className="btn btn-primary" href="/dealers">
            Apply to Become a Dealer
          </Link>
        </div>
      )}
    </div>
  );
}
