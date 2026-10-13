"use client";

import { useEffect, type RefObject } from "react";

export type ElectricAccent = "gold" | "ice";

/* rgb triples so they can be composed into rgba() at different opacities */
const ACCENT: Record<ElectricAccent, { core: string; glow: string; spark: string }> = {
  gold: { core: "201,151,46", glow: "240,180,41", spark: "255,226,140" },
  ice: { core: "79,151,238", glow: "128,180,255", spark: "223,240,255" },
};

/**
 * Draws a live canvas border around `hostRef`: a steady accent glow plus two
 * highlights that travel the perimeter and occasional small arc "bursts" —
 * an electric-line effect without pulling in a WebGL dependency.
 *
 * `radius` is the corner radius in CSS px. Omit it for a full pill (radius
 * tracks the host's own height, like a button); pass a smaller value to trace
 * a rounded-rect card instead.
 */
export function useElectricBorder(
  hostRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  accent: ElectricAccent,
  radius?: number
) {
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
    let r = 0;
    let perimeter = 0;
    let lastT = 0;

    function roundedRectPath() {
      const p = new Path2D();
      p.moveTo(inset + r, inset);
      p.lineTo(w - inset - r, inset);
      p.arc(w - inset - r, inset + r, r, -Math.PI / 2, 0);
      p.lineTo(w - inset, h - inset - r);
      p.arc(w - inset - r, h - inset - r, r, 0, Math.PI / 2);
      p.lineTo(inset + r, h - inset);
      p.arc(inset + r, h - inset - r, r, Math.PI / 2, Math.PI);
      p.lineTo(inset, inset + r);
      p.arc(inset + r, inset + r, r, Math.PI, 1.5 * Math.PI);
      p.closePath();
      return p;
    }

    function pointAtFraction(f: number) {
      const topLen = Math.max(0, w - 2 * inset - 2 * r);
      const sideLen = Math.max(0, h - 2 * inset - 2 * r);
      const arcLen = (Math.PI / 2) * r;
      const total = 2 * topLen + 2 * sideLen + 4 * arcLen || 1;
      // r === 0 collapses every arc segment to a single corner point — guard
      // the `/r` divisions below rather than let floating-point rounding
      // occasionally let a near-zero `d` slip past a zero-length `arcLen`
      // and produce a non-finite theta (NaN x/y fed to the canvas API).
      const hasArc = r > 0;
      let d = (((f % 1) + 1) % 1) * total;
      if (d < topLen) return { x: inset + r + d, y: inset };
      d -= topLen;
      if (hasArc && d < arcLen) {
        const theta = -Math.PI / 2 + d / r;
        return { x: w - inset - r + r * Math.cos(theta), y: inset + r + r * Math.sin(theta) };
      }
      d -= arcLen;
      if (d < sideLen) return { x: w - inset, y: inset + r + d };
      d -= sideLen;
      if (hasArc && d < arcLen) {
        const theta = d / r;
        return { x: w - inset - r + r * Math.cos(theta), y: h - inset - r + r * Math.sin(theta) };
      }
      d -= arcLen;
      if (d < topLen) return { x: w - inset - r - d, y: h - inset };
      d -= topLen;
      if (hasArc && d < arcLen) {
        const theta = Math.PI / 2 + d / r;
        return { x: inset + r + r * Math.cos(theta), y: h - inset - r + r * Math.sin(theta) };
      }
      d -= arcLen;
      if (d < sideLen) return { x: inset, y: h - inset - r - d };
      d -= sideLen;
      if (!hasArc) return { x: inset, y: inset };
      const theta = Math.PI + d / r;
      return { x: inset + r + r * Math.cos(theta), y: inset + r + r * Math.sin(theta) };
    }

    type Spark = { t0: number; life: number; pos: number };
    const sparks: Spark[] = [];
    let nextBurst = 0;

    function draw(t: number) {
      lastT = t;
      ctx!.clearRect(0, 0, w, h);
      const path = roundedRectPath();

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
          if (!Number.isFinite(x) || !Number.isFinite(y)) {
            sparks.splice(i, 1);
            continue;
          }
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
      const rect = host!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const maxR = Math.max(0, Math.min(w, h) / 2 - inset);
      r = Math.max(0, Math.min(radius ?? h / 2, maxR));
      const topLen = Math.max(0, w - 2 * inset - 2 * r);
      const sideLen = Math.max(0, h - 2 * inset - 2 * r);
      perimeter = 2 * topLen + 2 * sideLen + 2 * Math.PI * r;
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
  }, [hostRef, canvasRef, accent, radius]);
}
