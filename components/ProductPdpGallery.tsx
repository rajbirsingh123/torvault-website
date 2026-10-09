"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FINISHES, getFinishImages, type Finish } from "@/lib/gallery";
import FavoriteButton from "@/components/FavoriteButton";

export default function ProductPdpGallery({ slug, label }: { slug: string; label: string }) {
  const [finish, setFinish] = useState<Finish>("graphite");
  const [activeImage, setActiveImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainRef = useRef<HTMLDivElement>(null);
  const images = getFinishImages(finish);

  function selectFinish(next: Finish) {
    setFinish(next);
    setActiveImage(0);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = mainRef.current?.getBoundingClientRect();
    if (!rect) return;
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div className="pdp-gallery">
      <div
        ref={mainRef}
        className="pdp-gallery-main"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
        style={{ "--zoom-x": `${zoomPos.x}%`, "--zoom-y": `${zoomPos.y}%` } as React.CSSProperties}
      >
        <FavoriteButton slug={slug} label={label} className="pdp-gallery-favorite" />
        <div className={`pdp-gallery-zoom${zoomed ? " is-zoomed" : ""}`}>
          <Image
            key={images[activeImage].src}
            src={images[activeImage].src}
            alt={images[activeImage].alt}
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <button
          type="button"
          className="pdp-gallery-nav prev"
          aria-label="Previous photo"
          onClick={() => setActiveImage((i) => (i + images.length - 1) % images.length)}
        >
          &#8249;
        </button>
        <button
          type="button"
          className="pdp-gallery-nav next"
          aria-label="Next photo"
          onClick={() => setActiveImage((i) => (i + 1) % images.length)}
        >
          &#8250;
        </button>
      </div>

      <div className="pdp-gallery-thumbs" role="tablist" aria-label="Product photos">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            role="tab"
            aria-selected={activeImage === i}
            aria-label={`Photo ${i + 1} of ${images.length}`}
            className={`pdp-gallery-thumb${activeImage === i ? " active" : ""}`}
            onClick={() => setActiveImage(i)}
          >
            <Image src={img.src} alt="" fill sizes="80px" style={{ objectFit: "cover" }} />
          </button>
        ))}
      </div>

      <div className="pdp-gallery-swatches" role="radiogroup" aria-label="Finish">
        {FINISHES.map((f) => (
          <button
            key={f.id}
            type="button"
            role="radio"
            aria-checked={finish === f.id}
            className={`pdp-gallery-swatch${finish === f.id ? " active" : ""}`}
            style={{ "--swatch": f.swatch } as React.CSSProperties}
            onClick={() => selectFinish(f.id)}
          >
            <span className="pdp-gallery-swatch-dot" aria-hidden="true" />
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
