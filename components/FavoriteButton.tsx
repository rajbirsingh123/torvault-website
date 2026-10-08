"use client";

import { useFavorite } from "@/lib/favorites";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4.5 5.8 4c2-.3 3.9.6 5.2 2.3C12.3 4.6 14.2 3.7 16.2 4c3.5.5 5.3 3.8 3.8 7.2-2.5 4.7-10 9.3-10 9.3z" />
    </svg>
  );
}

export default function FavoriteButton({
  slug,
  label,
  className = "",
}: {
  slug: string;
  label: string;
  className?: string;
}) {
  const [isFavorite, toggle] = useFavorite(slug);

  return (
    <button
      type="button"
      className={`favorite-btn tilt-ignore${isFavorite ? " active" : ""} ${className}`.trim()}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? `Remove ${label} from favorites` : `Add ${label} to favorites`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }}
    >
      <HeartIcon filled={isFavorite} />
    </button>
  );
}
