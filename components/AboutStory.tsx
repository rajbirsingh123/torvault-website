"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import Link from "next/link";
import { buildSafeRig } from "./safeModel";

type Chapter = {
  eyebrow: string;
  title: string;
  body: string;
  side: "left" | "right";
  cta?: { label: string; href: string };
};

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "About Torvault",
    title: "Built on strength, driven by expertise.",
    body: "With experience dating back to 1987, we deliver high-security safes for homeowners, retailers, businesses, government agencies, institutions, law enforcement, and the military — every safe built for uncompromising quality and lasting peace of mind.",
    side: "left",
  },
  {
    eyebrow: "01 — Our Purpose",
    title: "Strength. Experience. Confidence.",
    body: "Torvault was founded with a clear purpose: helping people protect what matters most. Backed by decades of industry expertise, we bring practical knowledge to a new generation of residential and commercial safes.",
    side: "right",
  },
  {
    eyebrow: "02 — Who We Serve",
    title: "Protection for every setting.",
    body: "From personal valuables and important documents to cash, inventory, and sensitive materials — we serve homeowners, retailers, commercial and industrial businesses, government agencies, institutions, law enforcement, and military clients.",
    side: "left",
  },
  {
    eyebrow: "03 — Our Expertise",
    title: "Experience behind every recommendation.",
    body: "Security ratings, fire protection, lock options, and everyday access all influence the right choice. Our team helps customers understand these differences so they can make informed decisions with confidence.",
    side: "right",
  },
  {
    eyebrow: "04 — Beyond The Sale",
    title: "Support that outlasts the purchase.",
    body: "From product selection and installation planning to ongoing service, we're committed to helping customers get lasting value from their purchase — earning trust through knowledgeable people and reliable protection.",
    side: "left",
    cta: { label: "Read Our Full Story", href: "/about" },
  },
];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * Scroll-synced "about us" sequence — same pinned-section, scroll-progress
 * architecture as BuildStory, built on the same shared procedural safe
 * model (safeModel.ts), just driven by its own camera tour instead of a
 * manufacturing timeline: a hero view, an angled turn, the door opening to
 * reveal what's inside, a close pass on the boltwork, and a final interior
 * close-up. The safe itself is already fully assembled throughout — no
 * wheel/keypad/bolt assembly animation, since this isn't about how it's
 * built, it's about what it's for.
 */
export default function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const host = canvasHostRef.current;
    if (!section || !host) return;

    let supportsWebGL = false;
    try {
      const probe = document.createElement("canvas");
      supportsWebGL = !!(probe.getContext("webgl2") || probe.getContext("webgl"));
    } catch {
      supportsWebGL = false;
    }
    if (!supportsWebGL) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = CHAPTERS.length;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.3 : 1.75);
    renderer.setPixelRatio(dpr);

    scene.add(new THREE.HemisphereLight(0x9cc3ff, 0x0b1d3a, 0.5));
    const key = new THREE.DirectionalLight(0xf5f8ff, 1.5);
    key.position.set(4, 5, 5);
    scene.add(key);
    const rimLight = new THREE.DirectionalLight(0x4f97ee, 1.1);
    rimLight.position.set(-5, -1.5, -4);
    scene.add(rimLight);

    // ---- the safe, already fully assembled (no manufacturing beats here)
    const safe = buildSafeRig(scene);
    const { doorPivot, wheel, keypad, bolts, interiorLight, bodyD } = safe;
    wheel.scale.setScalar(1);
    keypad.scale.setScalar(1);
    bolts.forEach(({ mesh, to }) => mesh.position.copy(to));

    function resize() {
      if (!host) return;
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let progress = 0;
    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const run = rect.height - window.innerHeight;
      progress = run > 0 ? clamp01(-rect.top / run) : 0;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    io.observe(section);

    function onVisibilityChange() {
      isVisible = isVisible && !document.hidden;
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ---- camera tour, one keyframe per chapter: hero → angled turn →
    // door-opening reveal → boltwork close pass → interior close-up
    // kept at a clear distance from every wall/door surface (inner walls
    // sit at x=±0.85, back wall at z=-0.65, floor/ceiling at y=-1.1/1.1,
    // and the open door sweeps out to roughly z=2.7) — the previous
    // closer-in values for the last two keyframes clipped into the door
    const camPos = [
      new THREE.Vector3(2.7, 0.55, 4.3),
      new THREE.Vector3(-2.75, 0.95, 3.5),
      new THREE.Vector3(-1.9, 0.7, 2.75),
      new THREE.Vector3(-1.3, 0.6, 2.6),
      new THREE.Vector3(-1.65, 0.65, 2.75),
    ];
    const camTarget = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.1, 0),
      new THREE.Vector3(-0.1, 0, bodyD / 2 - 0.2),
      new THREE.Vector3(-0.3, 0.15, 0.85),
      new THREE.Vector3(0, -0.25, -0.15),
    ];
    const curPos = new THREE.Vector3();
    const curTarget = new THREE.Vector3();

    function applyCamera(p: number, t: number) {
      const stage = p * (camPos.length - 1);
      const i = Math.min(camPos.length - 2, Math.floor(stage));
      const e = smoothstep(0, 1, stage - i);
      const pos = curPos.copy(camPos[i]).lerp(camPos[i + 1], e);
      const target = curTarget.copy(camTarget[i]).lerp(camTarget[i + 1], e);
      if (!reduced) {
        pos.x += Math.sin(t * 0.3) * 0.05;
        pos.y += Math.sin(t * 0.45) * 0.035;
      }
      camera.position.copy(pos);
      camera.lookAt(target);
    }

    let rafId = 0;
    let destroyed = false;
    const start = performance.now();

    function syncCopy(p: number) {
      // clamp to n-1 so the last chapter settles into its window and stays
      // there through p=1, instead of sailing past it and fading back out
      const chapterFloat = Math.min(p * n, n - 1);
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const local = chapterFloat - i;
        const vis = 1 - smoothstep(0.12, 0.85, Math.abs(local));
        el.style.opacity = vis.toFixed(3);
        el.style.transform = `translateY(${(1 - vis) * 16}px)`;
        el.style.pointerEvents = vis > 0.5 ? "auto" : "none";
      });
    }

    function render(now: number) {
      if (destroyed) return;
      rafId = requestAnimationFrame(render);
      if (document.hidden || !isVisible) return;

      const t = (now - start) / 1000;
      const p = progress;

      applyCamera(p, t);
      syncCopy(p);

      // the door opens through "Who We Serve" (chapter 2 of 5) and stays
      // open for the remaining chapters, revealing the interior
      const openAmt = smoothstep(0.32, 0.5, p);
      doorPivot.rotation.y = -openAmt * 1.95;
      interiorLight.intensity = smoothstep(0.1, 0.5, openAmt) * 2.6;

      if (!reduced) wheel.rotation.z = Math.sin(t * 0.25) * 0.04;

      renderer.render(scene, camera);
    }

    // position the camera and copy before the very first paint, so there's
    // never a stray frame with the camera still at its (0,0,0) default
    applyCamera(progress, 0);
    syncCopy(progress);
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(render);

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      safe.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="about-story" ref={sectionRef} aria-label="About Torvault">
      <div className="about-story-pin">
        <div className="about-story-grid-floor" aria-hidden="true" />
        <div className="about-story-glow" aria-hidden="true" />

        <div className="about-story-canvas" ref={canvasHostRef} aria-hidden="true" />

        <div className="about-story-vignette" aria-hidden="true" />

        <div className="wrap about-story-copy">
          {CHAPTERS.map((c, i) => (
            <div
              className={`about-story-chapter${c.side === "right" ? " is-right" : ""}`}
              key={c.title}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
            >
              <span className="eyebrow">{c.eyebrow}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              {c.cta && (
                <Link className="btn btn-ghost about-story-chapter-cta" href={c.cta.href}>
                  {c.cta.label} &rarr;
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
