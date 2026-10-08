"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Accent = "gold" | "ice";

type NeuralButtonProps = {
  href: string;
  children: ReactNode;
  accent?: Accent;
  className?: string;
};

/* rgb triples so they can be composed into rgba() at different opacities */
const ACCENT: Record<Accent, { core: string; glow: string; spark: string }> = {
  gold: { core: "201,151,46", glow: "240,180,41", spark: "255,226,140" },
  ice: { core: "79,151,238", glow: "128,180,255", spark: "223,240,255" },
};

/**
 * Pill button with a live canvas border: a steady accent glow plus two
 * highlights that travel the perimeter and occasional small arc "bursts" —
 * an electric-line effect without pulling in a WebGL dependency.
 */
export default function NeuralButton({
  href,
  children,
  accent = "gold",
  className = "",
}: NeuralButtonProps) {
  const hostRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { core, glow, spark } = ACCENT[accent];
    const inset = 1.5;

    let w = 0;
    let h = 0;
    let perimeter = 0;
    let lastT = 0;

    function pillPath() {
      const radius = h / 2 - inset;
      const p = new Path2D();
      p.moveTo(inset + radius, inset);
      p.lineTo(w - inset - radius, inset);
      p.arc(w - inset - radius, h / 2, radius, -Math.PI / 2, Math.PI / 2);
      p.lineTo(inset + radius, h - inset);
      p.arc(inset + radius, h / 2, radius, Math.PI / 2, (3 * Math.PI) / 2);
      p.closePath();
      return p;
    }

    function pointAtFraction(f: number) {
      const radius = h / 2 - inset;
      const straight = Math.max(0, w - h);
      const halfCirc = Math.PI * radius;
      const total = 2 * straight + 2 * halfCirc || 1;
      let d = (((f % 1) + 1) % 1) * total;
      const cxL = inset + radius;
      const cxR = w - inset - radius;
      const cy = h / 2;
      if (d < straight) return { x: cxL + d, y: inset };
      d -= straight;
      if (d < halfCirc) {
        const theta = -Math.PI / 2 + d / radius;
        return { x: cxR + radius * Math.cos(theta), y: cy + radius * Math.sin(theta) };
      }
      d -= halfCirc;
      if (d < straight) return { x: cxR - d, y: h - inset };
      d -= straight;
      const theta = Math.PI / 2 + d / radius;
      return { x: cxL + radius * Math.cos(theta), y: cy + radius * Math.sin(theta) };
    }

    type Spark = { t0: number; life: number; pos: number };
    const sparks: Spark[] = [];
    let nextBurst = 0;

    function draw(t: number) {
      lastT = t;
      ctx!.clearRect(0, 0, w, h);
      const path = pillPath();

      const flicker = 0.75 + 0.15 * Math.sin(t * 0.0021) + 0.1 * Math.sin(t * 0.0057 + 1.3);
      ctx!.save();
      ctx!.shadowColor = `rgba(${glow},${0.55 * flicker})`;
      ctx!.shadowBlur = 14;
      ctx!.strokeStyle = `rgba(${core},${0.5 * flicker})`;
      ctx!.lineWidth = 1.4;
      ctx!.stroke(path);
      ctx!.restore();

      if (!reduced) {
        const speed = 0.00011;
        const sparkLen = perimeter * 0.16;

        ctx!.save();
        ctx!.shadowColor = `rgba(${spark},0.95)`;
        ctx!.shadowBlur = 18;
        ctx!.strokeStyle = `rgba(${spark},0.9)`;
        ctx!.lineWidth = 2.2;
        ctx!.lineCap = "round";
        ctx!.setLineDash([sparkLen, Math.max(1, perimeter - sparkLen)]);
        ctx!.lineDashOffset = -((t * speed * perimeter) % perimeter);
        ctx!.stroke(path);
        ctx!.restore();

        ctx!.save();
        ctx!.shadowColor = `rgba(${spark},0.6)`;
        ctx!.shadowBlur = 12;
        ctx!.strokeStyle = `rgba(${spark},0.5)`;
        ctx!.lineWidth = 1.6;
        ctx!.lineCap = "round";
        ctx!.setLineDash([sparkLen * 0.6, Math.max(1, perimeter - sparkLen * 0.6)]);
        ctx!.lineDashOffset = -((t * speed * perimeter + perimeter / 2) % perimeter);
        ctx!.stroke(path);
        ctx!.restore();
        ctx!.setLineDash([]);

        if (t > nextBurst) {
          sparks.push({ t0: t, life: 220 + Math.random() * 260, pos: Math.random() });
          nextBurst = t + 650 + Math.random() * 1400;
        }
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          const age = t - s.t0;
          if (age > s.life) {
            sparks.splice(i, 1);
            continue;
          }
          const k = 1 - age / s.life;
          const { x, y } = pointAtFraction(s.pos);
          ctx!.save();
          ctx!.globalAlpha = k;
          const grad = ctx!.createRadialGradient(x, y, 0, x, y, 10);
          grad.addColorStop(0, `rgba(${spark},0.9)`);
          grad.addColorStop(1, `rgba(${spark},0)`);
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(x, y, 9, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.restore();
        }
      }
    }

    function resize() {
      const r = host!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const radius = h / 2 - inset;
      const straight = Math.max(0, w - h);
      perimeter = 2 * straight + 2 * Math.PI * radius;
      draw(lastT);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(host);

    let rafId = 0;
    let destroyed = false;

    function frame(t: number) {
      if (destroyed) return;
      rafId = requestAnimationFrame(frame);
      if (document.hidden || !isVisible) return;
      draw(t);
    }
    if (!reduced) rafId = requestAnimationFrame(frame);

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, [accent]);

  return (
    <Link href={href} ref={hostRef} className={`neural-btn neural-btn-${accent} ${className}`}>
      <canvas aria-hidden="true" ref={canvasRef} />
      <span className="neural-btn-label">{children}</span>
    </Link>
  );
}
