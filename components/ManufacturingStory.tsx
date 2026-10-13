"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTranslations } from "next-intl";
import { buildSafeRig } from "./safeModel";

type Chapter = {
  eyebrow: string;
  title: string;
  body: string;
};

function buildChapters(t: ReturnType<typeof useTranslations>): Chapter[] {
  return [
    { eyebrow: t("ch1Eyebrow"), title: t("ch1Title"), body: t("ch1Body") },
    { eyebrow: t("ch2Eyebrow"), title: t("ch2Title"), body: t("ch2Body") },
    { eyebrow: t("ch3Eyebrow"), title: t("ch3Title"), body: t("ch3Body") },
    { eyebrow: t("ch4Eyebrow"), title: t("ch4Title"), body: t("ch4Body") },
    { eyebrow: t("ch5Eyebrow"), title: t("ch5Title"), body: t("ch5Body") },
    { eyebrow: t("ch6Eyebrow"), title: t("ch6Title"), body: t("ch6Body") },
  ];
}

const STEPS = [0, 1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6, 1];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
/** 0→1→0 bump: rises a→b, holds, falls c→d. */
const trapezoid = (p: number, a: number, b: number, c: number, d: number) =>
  smoothstep(a, b, p) * (1 - smoothstep(c, d, p));
/** Weight for "this chapter's transient effect is active", with soft edges. */
const stageWeight = (p: number, k: number) => {
  const a = k === 0 ? -1 : STEPS[k] - 0.045;
  const b = STEPS[k] + 0.045;
  const c = STEPS[k + 1] - 0.045;
  const d = k === 5 ? 2 : STEPS[k + 1] + 0.045;
  return trapezoid(p, a, b, c, d);
};

/**
 * The manufacturing page's own scroll-synced sequence — six chapters, one
 * per real production stage (design → steel → hardplate → locking assembly
 * → compliance testing → dealer distribution), not a reuse of the
 * homepage's three-chapter BuildStory. Shares the one procedural safe rig
 * (safeModel.ts) for visual consistency, but choreographs it on its own
 * six-stage timeline and keeps the door closed throughout — this is a
 * shipped, sealed unit, not a reveal.
 */
export default function ManufacturingStory() {
  const t = useTranslations("manufacturingStory");
  const CHAPTERS = buildChapters(t);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const railRefs = useRef<Array<HTMLDivElement | null>>([]);

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

    scene.add(new THREE.HemisphereLight(0x9cc3ff, 0x0b1d3a, 0.5));
    const key = new THREE.DirectionalLight(0xf5f8ff, 1.5);
    key.position.set(4, 5, 5);
    scene.add(key);
    const rimLight = new THREE.DirectionalLight(0x4f97ee, 1.1);
    rimLight.position.set(-5, -1.5, -4);
    scene.add(rimLight);

    const safe = buildSafeRig(scene);
    const { wheel, dialKnobPivot, keypad, bolts, bodyMat, doorMat, seamMat, hardplate, hardplateMat, doorW, doorT } =
      safe;

    // a thin emissive "scan line" that sweeps the body during the design
    // stage, selling a blueprint/CAD read rather than hand-welded metal
    const scanMat = new THREE.MeshBasicMaterial({ color: 0x8fc0ff, transparent: true, opacity: 0 });
    const scanLine = new THREE.Mesh(new THREE.PlaneGeometry(safe.bodyW * 0.92, 0.012), scanMat);
    scanLine.position.set(0, 0, safe.bodyD / 2 + 0.01);
    scene.add(scanLine);

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
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.02 });
    io.observe(section);

    function onVisibilityChange() {
      isVisible = isVisible && !document.hidden;
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    // one camera waypoint per chapter: wide design overview → in on the
    // seam → in on the lock cluster → on the wheel/bolts → a slow
    // inspection orbit → pulled back wide for the sealed, shipped unit
    const lockX = doorW * 0.62 - 0.22;
    const camPos = [
      new THREE.Vector3(3.6, 1.35, 5.3),
      new THREE.Vector3(-1.5, 0.5, 3.6),
      new THREE.Vector3(0.75, 0.35, 2.7),
      new THREE.Vector3(0.95, 0.15, 2.5),
      new THREE.Vector3(1.9, 0.6, 3.9),
      new THREE.Vector3(4.1, 1.6, 6.1),
    ].map((v) => v);
    const camTarget = [
      new THREE.Vector3(0, 0.1, 0),
      new THREE.Vector3(-safe.bodyW / 2, 0, safe.bodyD / 2 - 0.1),
      new THREE.Vector3(lockX, 0.42, doorT / 2),
      new THREE.Vector3(doorW * 0.62, 0.1, doorT / 2),
      new THREE.Vector3(0.05, 0.05, doorT / 2),
      new THREE.Vector3(0, 0, 0),
    ];
    const curPos = new THREE.Vector3();
    const curTarget = new THREE.Vector3();

    function applyCamera(p: number, t: number) {
      const seg = p * (camPos.length - 1);
      const i = Math.min(camPos.length - 2, Math.floor(seg));
      const local = smoothstep(0, 1, seg - i);
      const pos = curPos.copy(camPos[i]).lerp(camPos[i + 1], local);
      const target = curTarget.copy(camTarget[i]).lerp(camTarget[i + 1], local);

      // stage 5's slow inspection orbit: gentle continuous rotation around
      // the target while this chapter is active, settling back out after
      const orbit = stageWeight(p, 4);
      if (orbit > 0.001 && !reduced) {
        const angle = t * 0.35 * orbit;
        const relX = pos.x - target.x;
        const relZ = pos.z - target.z;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        pos.x = target.x + relX * cos - relZ * sin;
        pos.z = target.z + relX * sin + relZ * cos;
      }
      if (!reduced) {
        pos.x += Math.sin(t * 0.35) * 0.1;
        pos.y += Math.sin(t * 0.5) * 0.035;
      }
      camera.position.copy(pos);
      camera.lookAt(target);
    }

    let rafId = 0;
    let destroyed = false;
    const start = performance.now();
    let lastChapter = -1;

    function syncCopy(p: number) {
      const chapterFloat = Math.min(p * CHAPTERS.length, CHAPTERS.length - 1);
      const active = Math.min(CHAPTERS.length - 1, Math.floor(chapterFloat));
      if (active !== lastChapter) {
        lastChapter = active;
        railRefs.current.forEach((el, i) => {
          if (el) el.classList.toggle("active", i === active);
        });
      }
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

      // stage 1 — Design & Engineering: translucent, blueprint-blue glow,
      // with a scan line sweeping the body front
      const blueprint = stageWeight(p, 0);
      // stage 2 — Steel Forming: hot cooling metal, weld seam glowing
      const heat = stageWeight(p, 1);

      const opacity = THREE.MathUtils.lerp(1, 0.4, blueprint);
      bodyMat.transparent = true;
      doorMat.transparent = true;
      bodyMat.opacity = opacity;
      doorMat.opacity = opacity;
      if (heat >= blueprint) {
        bodyMat.emissive.setHex(0xbfe0ff);
        doorMat.emissive.setHex(0xbfe0ff);
        bodyMat.emissiveIntensity = heat * 0.3;
        doorMat.emissiveIntensity = heat * 0.3;
      } else {
        bodyMat.emissive.setHex(0x4f97ee);
        doorMat.emissive.setHex(0x4f97ee);
        bodyMat.emissiveIntensity = blueprint * 0.22;
        doorMat.emissiveIntensity = blueprint * 0.22;
      }
      seamMat.opacity = heat * (0.65 + Math.sin(t * 6) * 0.1);

      if (blueprint > 0.01 && !reduced) {
        scanMat.opacity = blueprint * 0.8;
        const sweep = (Math.sin(t * 0.9) + 1) / 2;
        scanLine.position.y = THREE.MathUtils.lerp(-safe.bodyH / 2 + 0.1, safe.bodyH / 2 - 0.1, sweep);
      } else {
        scanMat.opacity = 0;
      }

      // stage 3 — Hardplate Lamination: bonds in and stays bonded
      const hardplateIn = smoothstep(STEPS[2], STEPS[2] + 0.1, p);
      hardplate.scale.setScalar(Math.max(0.001, hardplateIn));
      hardplateMat.opacity = hardplateIn;

      // stage 4 — Relocker & Locking Assembly: wheel/keypad/bolts/dial fit
      // into place and stay fitted
      const assembled = smoothstep(STEPS[3], STEPS[3] + 0.1, p);
      wheel.scale.setScalar(Math.max(0.001, assembled));
      keypad.scale.setScalar(Math.max(0.001, assembled));
      if (!reduced) {
        wheel.rotation.z = t * 0.5 * assembled;
        dialKnobPivot.rotation.z = -t * 0.9 * assembled;
      }
      bolts.forEach(({ mesh, from, to }) => {
        mesh.position.lerpVectors(from, to, assembled);
      });

      renderer.render(scene, camera);
    }

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

      scanLine.geometry.dispose();
      scanMat.dispose();
      safe.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="build-story manufacturing-story" ref={sectionRef} aria-label="How a Torvault safe is manufactured, stage by stage">
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
            </div>
          ))}
        </div>
        <div className="build-rail" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <div
              className="build-rail-dot"
              key={c.eyebrow}
              ref={(el) => {
                railRefs.current[i] = el;
              }}
            >
              <span className="ln" />
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
