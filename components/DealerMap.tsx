"use client";

import type { Dealer } from "@/lib/dealers";
import type { GeoPoint } from "@/lib/geo";

/**
 * Plain `maps.google.com/maps?...&output=embed` iframe — the no-API-key
 * embed form (distinct from the Embed API's `/maps/embed/v1/...`, which
 * requires a billed key). It can only show one place or one route at a
 * time, so this shows the closest matching dealer (the list is already
 * sorted by distance once a location is searched) rather than every pin.
 * When the visitor has searched a location or used "Use My Location", the
 * map switches from a plain pin to driving directions from there.
 */
export default function DealerMap({
  dealers,
  searchedLocation,
}: {
  dealers: Dealer[];
  searchedLocation?: GeoPoint | null;
}) {
  const primary = dealers[0];
  if (!primary) return null;

  // A bare "lat,lon" query frequently fails to resolve to a place card in
  // the keyless embed ("Place info couldn't load") — the dealer's mailing
  // address resolves to its actual Google Business listing instead.
  const place = encodeURIComponent(primary.mapsQuery);
  const src = searchedLocation
    ? `https://maps.google.com/maps?saddr=${searchedLocation.lat},${searchedLocation.lon}&daddr=${place}&z=11&output=embed`
    : `https://maps.google.com/maps?q=${place}&z=13&output=embed`;

  return (
    <div className="dealer-map">
      <iframe
        title={
          searchedLocation
            ? `Driving directions from ${searchedLocation.label} to ${primary.name}`
            : `Map showing ${primary.name}`
        }
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
