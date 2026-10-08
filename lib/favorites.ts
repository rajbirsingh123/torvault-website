"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "torvault:favorites";
const EVENT_NAME = "torvault:favorites-changed";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
  } catch {
    // localStorage unavailable (private mode, disabled storage) — favoriting silently no-ops
  }
}

export function useFavorites(): string[] {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
    function onChange() {
      setFavorites(readFavorites());
    }
    window.addEventListener(EVENT_NAME, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT_NAME, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return favorites;
}

export function useFavorite(slug: string): [boolean, () => void] {
  const favorites = useFavorites();
  const isFavorite = favorites.includes(slug);

  const toggle = useCallback(() => {
    const current = readFavorites();
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    writeFavorites(next);
  }, [slug]);

  return [isFavorite, toggle];
}

export function removeFavorite(slug: string) {
  writeFavorites(readFavorites().filter((s) => s !== slug));
}
