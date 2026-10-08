"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import { TAG_STYLES, type Dealer } from "@/lib/dealers";
import type { GeoPoint } from "@/lib/geo";
import "leaflet/dist/leaflet.css";

const PIN_HTML = `
<div style="
  width: 28px; height: 28px;
  background: linear-gradient(135deg, #2f7fe0, #0b1d3a);
  border: 2px solid #f0b429;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  box-shadow: 0 4px 10px rgba(0,0,0,0.45);
"></div>`;

const SEARCH_PIN_HTML = `
<div style="width: 22px; height: 22px; position: relative;">
  <div style="
    position: absolute; inset: 0;
    background: rgba(240, 180, 41, 0.35);
    border-radius: 50%;
    animation: dealerPulse 1.6s ease-out infinite;
  "></div>
  <div style="
    position: absolute; top: 4px; left: 4px;
    width: 14px; height: 14px;
    background: #f0b429;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.4);
  "></div>
</div>
<style>
  @keyframes dealerPulse {
    0% { transform: scale(0.6); opacity: 0.8; }
    100% { transform: scale(2.2); opacity: 0; }
  }
</style>`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function popupHtml(dealer: Dealer) {
  const tags = dealer.tags
    .map((tag) => {
      const style = TAG_STYLES[tag];
      const bg = style?.bg ?? "rgba(255,255,255,0.12)";
      const color = style?.text ?? "#eef1f6";
      return `<span style="display:inline-block;font-size:10px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:${color};background:${bg};padding:4px 9px;border-radius:5px;margin:0 4px 4px 0;">${escapeHtml(tag)}</span>`;
    })
    .join("");

  return `
    <div style="min-width:200px;">
      <div style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#f0c25e;margin-bottom:4px;">${escapeHtml(dealer.dealerType)}</div>
      <strong style="font-size:15px;color:#fff;">${escapeHtml(dealer.name)}</strong>
      <div style="margin:8px 0;">${tags}</div>
      ${dealer.description ? `<p style="margin:0 0 8px;color:#c3cade;">${escapeHtml(dealer.description)}</p>` : ""}
      <div style="color:#c3cade;">${escapeHtml(dealer.address)}</div>
      <div><a href="${dealer.phoneHref}" style="color:#8fc0ff;">${escapeHtml(dealer.phone)}</a></div>
      ${dealer.website ? `<div><a href="${dealer.website}" target="_blank" rel="noopener noreferrer" style="color:#8fc0ff;">${escapeHtml(dealer.website.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a></div>` : ""}
    </div>
  `;
}

export default function DealerMap({
  dealers,
  searchedLocation,
}: {
  dealers: Dealer[];
  searchedLocation?: GeoPoint | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      if (!mapRef.current) {
        const map = L.map(containerRef.current, {
          scrollWheelZoom: false,
          zoomControl: true,
        }).setView([56, -96], 3);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        mapRef.current = map;
      }

      const map = mapRef.current;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const icon = L.divIcon({
        className: "dealer-pin",
        html: PIN_HTML,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -26],
      });

      dealers.forEach((dealer) => {
        const marker = L.marker([dealer.lat, dealer.lon], { icon })
          .addTo(map)
          .bindPopup(popupHtml(dealer), { maxWidth: 260 });
        markersRef.current.push(marker);
      });

      if (searchedLocation) {
        const searchIcon = L.divIcon({
          className: "dealer-search-pin",
          html: SEARCH_PIN_HTML,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
        const marker = L.marker([searchedLocation.lat, searchedLocation.lon], { icon: searchIcon })
          .addTo(map)
          .bindTooltip(searchedLocation.label, { direction: "top", offset: [0, -8] });
        markersRef.current.push(marker);
      }

      const points: [number, number][] = dealers.map((d) => [d.lat, d.lon]);
      if (searchedLocation) points.push([searchedLocation.lat, searchedLocation.lon]);

      if (points.length === 1) {
        map.setView(points[0], 12);
      } else if (points.length > 1) {
        map.fitBounds(L.latLngBounds(points), { padding: [48, 48] });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [dealers, searchedLocation]);

  useEffect(() => {
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="dealer-map" />;
}
