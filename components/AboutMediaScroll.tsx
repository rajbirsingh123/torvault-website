"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ANGLES = [
  { src: "/products/graphite/01-torvault-front-closed.jpg", alt: "Torvault safe, front view, door closed" },
  { src: "/products/graphite/03-torvault-angled-view.jpg", alt: "Torvault safe, angled three-quarter view" },
  { src: "/products/graphite/02-torvault-front-open.jpg", alt: "Torvault safe, door open, showing the interior shelf" },
  { src: "/products/graphite/05-torvault-interior-detail.jpg", alt: "Torvault safe, interior boltwork detail" },
];

/**
 * Real product photography that cycles through angles as this block scrolls
 * through the viewport — closed, three-quarter, open, interior detail —
 * instead of one static hero shot. Progress is driven by the block's own
 * position in the viewport (no pinning), so it advances naturally as the
 * "Why we built Torvault" copy scrolls past it.
 */
export default function AboutMediaScroll() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    function onScroll() {
      const rect = host!.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 as the block's top enters the viewport from the bottom, 1 as its
      // bottom leaves the viewport at the top
      const total = rect.height + vh;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / total));
      const idx = Math.min(ANGLES.length - 1, Math.floor(progress * ANGLES.length));
      setActive(idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="about-media-scroll" ref={hostRef}>
      {ANGLES.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover", opacity: active === i ? 1 : 0 }}
          priority={i === 0}
        />
      ))}
      <div className="about-media-dots" aria-hidden="true">
        {ANGLES.map((_, i) => (
          <span key={i} className={`about-media-dot${active === i ? " active" : ""}`} />
        ))}
      </div>
    </div>
  );
}
