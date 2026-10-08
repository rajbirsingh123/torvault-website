export type GeoPoint = { label: string; lat: number; lon: number };

/** Great-circle distance between two coordinates, in kilometers. */
export function distanceKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const lat1 = (aLat * Math.PI) / 180;
  const lat2 = (bLat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}

export function formatDistanceKm(km: number): string {
  return km < 10 ? `${km.toFixed(1)} km away` : `${Math.round(km)} km away`;
}

/** Looks up place suggestions via OpenStreetMap's free Nominatim geocoder. */
export async function searchPlaces(query: string, signal: AbortSignal): Promise<GeoPoint[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
    query
  )}&countrycodes=ca&limit=5&addressdetails=0`;
  const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!res.ok) return [];
  const data = (await res.json()) as { display_name: string; lat: string; lon: string }[];
  return data.map((d) => ({ label: d.display_name, lat: parseFloat(d.lat), lon: parseFloat(d.lon) }));
}
