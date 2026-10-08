"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

export default function TiltCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ((e.target as HTMLElement).closest(".tilt-ignore")) {
      el.style.transition = "transform 150ms ease";
      el.style.transform = "";
      return;
    }
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform 80ms linear";
    el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateY(-6px) translateZ(6px)`;
  }

  function onPointerLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
      style={{ ...style, height: "100%", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
