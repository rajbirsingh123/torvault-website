"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Step = {
  num: string;
  title: string;
  body: ReactNode;
};

type StepCarouselProps = {
  steps: Step[];
};

/**
 * Pointer-tilt, idle-drifting step carousel: cards sit on a 3D stage and
 * glide toward whichever one is "focused." Mouse movement nudges the focus
 * sideways, wheel/arrow keys/click step through explicitly, and after a
 * few seconds of no input the stage drifts on its own. Pauses off-screen
 * and respects prefers-reduced-motion, same gating as VaultScene/NeuralButton.
 */
export default function StepCarousel({ steps }: StepCarouselProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const cards = cardRefs.current.filter((c): c is HTMLButtonElement => !!c);
    const count = cards.length;
    if (!count) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = {
      phase: 0,
      target: 0,
      base: 0,
      pointerX: 0,
      pointerActive: false,
      lastInput: performance.now(),
    };

    function wrappedDelta(index: number, phase: number) {
      let d = index - phase;
      while (d > count / 2) d -= count;
      while (d < -count / 2) d += count;
      return d;
    }
    function nearestIndex() {
      return ((Math.round(state.phase) % count) + count) % count;
    }
    function moveTo(index: number) {
      const current = nearestIndex();
      let delta = index - current;
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
      state.base += delta;
      state.target = state.base;
      state.pointerActive = false;
      state.lastInput = performance.now();
    }

    function onPointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const rect = stage!.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      state.pointerX = nx;
      state.pointerActive = true;
      state.target = state.base + nx * 0.85;
      state.lastInput = performance.now();
    }
    function onPointerLeave() {
      state.pointerActive = false;
      state.pointerX = 0;
      state.target = state.base;
    }

    let dragStartX: number | null = null;
    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === "mouse") return;
      dragStartX = e.clientX;
    }
    function onPointerUp(e: PointerEvent) {
      if (dragStartX === null) return;
      const dx = e.clientX - dragStartX;
      dragStartX = null;
      if (Math.abs(dx) < 36) return;
      state.base += dx < 0 ? 1 : -1;
      state.target = state.base;
      state.lastInput = performance.now();
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const dir = Math.sign(Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX);
      if (!dir) return;
      state.base += dir;
      state.target = state.base;
      state.pointerActive = false;
      state.lastInput = performance.now();
    }

    function onKeyDown(e: KeyboardEvent) {
      if (!stage!.contains(document.activeElement)) return;
      const forward = e.key === "ArrowRight";
      const backward = e.key === "ArrowLeft";
      if (!forward && !backward) return;
      e.preventDefault();
      state.base += forward ? 1 : -1;
      state.target = state.base;
      state.pointerActive = false;
      state.lastInput = performance.now();
    }

    cards.forEach((card, i) => {
      card.addEventListener("click", () => moveTo(i));
      card.addEventListener("focus", () => moveTo(i));
    });
    if (!reduced) stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave, { passive: true });
    stage.addEventListener("pointerdown", onPointerDown, { passive: true });
    stage.addEventListener("pointerup", onPointerUp, { passive: true });
    stage.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(stage);

    let rafId = 0;
    let destroyed = false;
    let previousTime = performance.now();

    function draw() {
      const nearest = nearestIndex();
      cards.forEach((card, i) => {
        const delta = wrappedDelta(i, state.phase);
        const dist = Math.abs(delta);
        const focus = Math.max(0, 1 - dist * 0.6);
        const x = delta * 280;
        const z = -dist * 130;
        const scale = 0.82 + focus * 0.18;
        const rotateY = -delta * 9;
        card.style.setProperty("--focus", focus.toFixed(3));
        card.style.zIndex = String(Math.round(100 - dist * 10));
        card.style.opacity = String(Math.max(0.2, 1 - dist * 0.42));
        card.style.transform = `translate(-50%,-50%) translate3d(${x.toFixed(1)}px,0,${z.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        card.setAttribute("aria-current", i === nearest ? "true" : "false");
      });
    }

    function frame(time: number) {
      if (destroyed) return;
      rafId = requestAnimationFrame(frame);
      if (document.hidden || !isVisible) {
        previousTime = time;
        return;
      }
      const dt = Math.min(32, time - previousTime);
      previousTime = time;
      const ease = reduced ? 1 : 1 - Math.pow(0.001, dt / 1000);

      if (!reduced && !state.pointerActive && time - state.lastInput > 2600) {
        const idle = time - state.lastInput - 2600;
        state.target = state.base + Math.sin(idle * 0.00035) * 0.6;
      }

      state.phase += (state.target - state.phase) * ease;
      draw();
    }

    draw();
    rafId = requestAnimationFrame(frame);

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      io.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [steps.length]);

  return (
    <div className="step-stage" ref={stageRef} aria-label="Onboarding steps, scroll or drag to browse">
      {steps.map((step, i) => (
        <button
          key={step.num}
          type="button"
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="step-card"
          aria-label={`Focus step ${step.num}: ${step.title}`}
        >
          <span className="step-card-num">{step.num}</span>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </button>
      ))}
    </div>
  );
}
