"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural vault-door hero visual. No external models/textures — the
 * door, wheel, spokes and bolt ring are all primitive geometry so this
 * ships with zero extra asset weight. Idle rotation + pointer parallax +
 * a scroll-linked dolly/rotate give it the "always in motion, never
 * finished" cinematic quality without hijacking page scroll.
 */
export default function VaultScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let supportsWebGL = false;
    try {
      const probe = document.createElement("canvas");
      supportsWebGL = !!(
        probe.getContext("webgl2") || probe.getContext("webgl")
      );
    } catch {
      supportsWebGL = false;
    }
    if (!supportsWebGL) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth < 640 ? 1.5 : 1.85
    );
    renderer.setPixelRatio(dpr);

    // ---- lighting: no shadow maps, just a few lights for a brushed-metal read
    scene.add(new THREE.HemisphereLight(0x9cc3ff, 0x0b1d3a, 0.55));
    const key = new THREE.DirectionalLight(0xf5f8ff, 1.5);
    key.position.set(4.5, 5.5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x4f97ee, 1.3);
    rim.position.set(-6, -2.5, -5);
    scene.add(rim);
    const accent = new THREE.PointLight(0xbfe0ff, 0.9, 9);
    accent.position.set(0.5, 1.2, 3.4);
    scene.add(accent);

    // ---- materials
    const steelDark = new THREE.MeshStandardMaterial({
      color: 0x16233f,
      metalness: 0.82,
      roughness: 0.38,
    });
    const steelFace = new THREE.MeshStandardMaterial({
      color: 0x0b1d3a,
      metalness: 0.65,
      roughness: 0.52,
    });
    const steelBolt = new THREE.MeshStandardMaterial({
      color: 0x2c3c5c,
      metalness: 0.8,
      roughness: 0.4,
    });
    const accentMetal = new THREE.MeshStandardMaterial({
      color: 0x2f7fe0,
      metalness: 0.92,
      roughness: 0.22,
    });
    const indicator = new THREE.MeshStandardMaterial({
      color: 0xbfe0ff,
      emissive: 0x4f97ee,
      emissiveIntensity: 0.9,
      metalness: 0.3,
      roughness: 0.3,
    });

    const rig = new THREE.Group();
    scene.add(rig);

    const doorOuter = new THREE.Mesh(
      new THREE.CylinderGeometry(2.3, 2.3, 0.46, 72),
      steelDark
    );
    doorOuter.rotation.x = Math.PI / 2;
    doorOuter.position.z = -0.32;
    rig.add(doorOuter);

    const trimRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.3, 0.045, 12, 72),
      accentMetal
    );
    trimRing.position.z = -0.08;
    rig.add(trimRing);

    const doorFace = new THREE.Mesh(
      new THREE.CylinderGeometry(1.92, 1.92, 0.2, 72),
      steelFace
    );
    doorFace.rotation.x = Math.PI / 2;
    doorFace.position.z = 0.02;
    rig.add(doorFace);

    // ring of flush bolts set into the face
    const boltCount = 20;
    const boltRadius = 1.6;
    const bolts: THREE.Mesh[] = [];
    const boltGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.1, 10);
    for (let i = 0; i < boltCount; i++) {
      const angle = (i / boltCount) * Math.PI * 2;
      const bolt = new THREE.Mesh(boltGeo, steelBolt);
      bolt.rotation.x = Math.PI / 2;
      bolt.position.set(
        Math.cos(angle) * boltRadius,
        Math.sin(angle) * boltRadius,
        0.14
      );
      rig.add(bolt);
      bolts.push(bolt);
    }

    // ---- the wheel: hub + rim + radiating spokes, sits proud of the face
    const wheel = new THREE.Group();
    wheel.position.z = 0.3;
    rig.add(wheel);

    const hub = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 28, 28),
      accentMetal
    );
    wheel.add(hub);

    const wheelRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.64, 0.07, 14, 48),
      accentMetal
    );
    wheel.add(wheelRim);

    const spokeGeo = new THREE.BoxGeometry(0.075, 0.6, 0.075);
    const spokeCount = 6;
    for (let i = 0; i < spokeCount; i++) {
      const spoke = new THREE.Mesh(spokeGeo, steelBolt);
      spoke.position.y = 0.32;
      const holder = new THREE.Group();
      holder.rotation.z = (i / spokeCount) * Math.PI * 2;
      holder.add(spoke);
      wheel.add(holder);
    }

    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), indicator);
    dot.position.z = 0.24;
    wheel.add(dot);

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

    // ---- pointer parallax (desktop mouse only — same gate TiltCard uses)
    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };
    function onPointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const r = host!.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointerTarget.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    }
    if (!reduced) window.addEventListener("pointermove", onPointerMove, { passive: true });

    // ---- scroll progress across the hero's own height
    let scrollT = 0;
    function onScroll() {
      const section = host!.closest<HTMLElement>(".hero");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = rect.height || 1;
      scrollT = Math.min(1, Math.max(0, -rect.top / total));
    }
    if (!reduced) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // ---- visibility gating: no point spending battery off-screen or hidden
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(host);

    function onVisibilityChange() {
      isVisible = isVisible && !document.hidden;
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    let rafId = 0;
    let destroyed = false;
    const start = performance.now();

    // paint one frame right away so the hero is never blank while it waits
    // on visibility/animation gating (background tabs, slow IO callbacks).
    renderer.render(scene, camera);

    function frame(now: number) {
      if (destroyed) return;
      rafId = requestAnimationFrame(frame);
      if (document.hidden || !isVisible) return;

      const t = (now - start) / 1000;

      if (!reduced) {
        wheel.rotation.z = t * 0.26;

        pointer.x += (pointerTarget.x - pointer.x) * 0.06;
        pointer.y += (pointerTarget.y - pointer.y) * 0.06;
        rig.rotation.y = pointer.x * 0.22 + scrollT * 0.3;
        rig.rotation.x = -pointer.y * 0.14;

        camera.position.z = 8.4 - scrollT * 1.0;
        rig.position.y = -scrollT * 0.55;

        const breathe = Math.sin(t * 1.3) * 0.5 + 0.5;
        indicator.emissiveIntensity = 0.55 + breathe * 0.6;

        const push = 0.02 + Math.sin(scrollT * Math.PI) * 0.045;
        bolts.forEach((bolt, i) => {
          const phase = (i / boltCount) * Math.PI * 2;
          bolt.position.z = 0.14 + push + Math.sin(t * 1.6 + phase) * 0.004;
        });
      }

      renderer.render(scene, camera);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
        }
      });
      [steelDark, steelFace, steelBolt, accentMetal, indicator].forEach((m) =>
        m.dispose()
      );
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={hostRef} className="vault-scene" aria-hidden="true" />;
}
