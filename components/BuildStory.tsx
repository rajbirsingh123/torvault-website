"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildSafeRig } from "./safeModel";
import NeuralBorder from "./NeuralBorder";

type Chapter = {
  eyebrow: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

function buildChapters(ctaHref?: string): Chapter[] {
  return [
    {
      eyebrow: "01 — Manufacturing",
      title: "Cut, formed, and welded.",
      body: "Every Torvault body starts as solid cold-rolled steel plate — cut, formed, and welded on our production line to the thickness specified for each line, from 12-gauge RSC bodies to 1.5″ solid TL‑30 construction.",
    },
    {
      eyebrow: "02 — Assembly",
      title: "Hardplate, bolts, and the wheel.",
      body: "Composite hardplate is bonded over the boltwork, then the relocking bolts, dial, and locking wheel are fitted and function-tested before the door is ever hung.",
    },
    {
      eyebrow: "03 — Opening",
      title: "Built to hold. Engineered to last.",
      body: "Every weld and every bolt is checked before a unit ships — and inspected again once it's hung, so the door opens exactly as specified.",
      cta: ctaHref ? { label: "See the Full Manufacturing Process", href: ctaHref } : undefined,
    },
  ];
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/**
 * A scroll-synced "how it's built" sequence: one procedural safe model
 * (shared with AboutStory via safeModel.ts), no external assets. Scroll
 * position (0→1 across the section) drives everything — camera path, the
 * body's cooling weld glow, the locking wheel and bolts assembling, and
 * finally the door swinging open to reveal the interior. The left-hand
 * copy panel advances in lockstep, driven by the same progress value, not
 * a separate timeline.
 */
export default function BuildStory({ ctaHref = "/manufacturing" }: { ctaHref?: string | null } = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const CHAPTERS = buildChapters(ctaHref ?? undefined);

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

    // ---- lighting
    scene.add(new THREE.HemisphereLight(0x9cc3ff, 0x0b1d3a, 0.5));
    const key = new THREE.DirectionalLight(0xf5f8ff, 1.5);
    key.position.set(4, 5, 5);
    scene.add(key);
    const rimLight = new THREE.DirectionalLight(0x4f97ee, 1.1);
    rimLight.position.set(-5, -1.5, -4);
    scene.add(rimLight);

    // ---- the safe
    const safe = buildSafeRig(scene);
    const { doorPivot, wheel, dial, dialKnobPivot, keypad, bolts, interiorLight, bodyMat, doorMat, seamMat, bodyD } =
      safe;

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

    // ---- scroll progress across the whole (tall) section
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
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.02 });
    io.observe(section);

    function onVisibilityChange() {
      isVisible = isVisible && !document.hidden;
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ---- camera keyframes: Manufacturing → Assembly → Open/Interior
    const camPos = [
      new THREE.Vector3(0, 0.35, 5.7),
      new THREE.Vector3(0.35, 0.35, 4.0),
      new THREE.Vector3(-1.75, 0.85, 2.9),
    ];
    const camTarget = [
      new THREE.Vector3(0, 0.1, 0),
      new THREE.Vector3(0.25, 0, bodyD / 2),
      new THREE.Vector3(0.05, -0.1, -0.35),
    ];
    const curPos = new THREE.Vector3();
    const curTarget = new THREE.Vector3();

    function applyCamera(p: number, t: number) {
      let pos: THREE.Vector3;
      let target: THREE.Vector3;
      if (p < 0.5) {
        const e = smoothstep(0, 0.5, p);
        pos = curPos.copy(camPos[0]).lerp(camPos[1], e);
        target = curTarget.copy(camTarget[0]).lerp(camTarget[1], e);
      } else {
        const e = smoothstep(0.5, 1, p);
        pos = curPos.copy(camPos[1]).lerp(camPos[2], e);
        target = curTarget.copy(camTarget[1]).lerp(camTarget[2], e);
      }
      if (!reduced) {
        pos.x += Math.sin(t * 0.35) * 0.12 * 0.3;
        pos.y += Math.sin(t * 0.5) * 0.04;
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
      const chapterFloat = Math.min(p * CHAPTERS.length, CHAPTERS.length - 1);
      chapterRefs.current.forEach((el, i) => {
        if (!el) return;
        const local = chapterFloat - i;
        const vis = 1 - smoothstep(0.12, 0.85, Math.abs(local));
        el.style.opacity = vis.toFixed(3);
        el.style.transform = `translateY(${(1 - vis) * 14}px)`;
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

      // stage 1 (0 → ~0.3): hot steel cooling, weld seam glowing then fading
      const heat = 1 - smoothstep(0.0, 0.3, p);
      bodyMat.emissiveIntensity = heat * 0.3;
      doorMat.emissiveIntensity = heat * 0.3;
      seamMat.opacity = heat * (0.65 + Math.sin(t * 6) * 0.1);

      // stage 2 (~0.1 → ~0.4): wheel, keypad, and bolts assemble — the dial
      // and nameplate are already cast into the door, so only the dial's
      // knob still turns here as a "fitted and function-tested" beat
      const assembled = smoothstep(0.12, 0.4, p);
      wheel.scale.setScalar(Math.max(0.001, assembled));
      keypad.scale.setScalar(Math.max(0.001, assembled));
      if (!reduced) {
        wheel.rotation.z = t * 0.5 * assembled;
        dialKnobPivot.rotation.z = -t * 0.9 * assembled;
      }
      bolts.forEach(({ mesh, from, to }) => {
        mesh.position.lerpVectors(from, to, assembled);
      });

      // stage 3 (~0.62 → 1.0): the door swings open, interior light rises
      const openAmt = smoothstep(0.62, 1.0, p);
      doorPivot.rotation.y = -openAmt * 1.95;
      interiorLight.intensity = smoothstep(0.1, 0.55, openAmt) * 2.6;

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
    <section className="build-story" ref={sectionRef} aria-label="How a Torvault safe is built">
      <div className="build-pin">
        <div className="build-canvas" ref={canvasHostRef} aria-hidden="true" />
        <div className="build-scrim" aria-hidden="true" />
        <div className="wrap build-copy">
          {CHAPTERS.map((c, i) => (
            <div
              className="build-chapter"
              key={c.title}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
            >
              <span className="eyebrow">{c.eyebrow}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              {c.cta && (
                <a className="btn btn-ghost build-chapter-cta" href={c.cta.href}>
                  <NeuralBorder accent="ice" />
                  <span className="neural-btn-label">{c.cta.label} &rarr;</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
