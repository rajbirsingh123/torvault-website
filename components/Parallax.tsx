"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function Parallax({
  children,
  className = "",
  strength = 0.08,
  style,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let inView = false;

    function update() {
      raf = 0;
      if (!inView || !el) return;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = Math.max(-36, Math.min(36, -mid * strength));
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    }

    function queue() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) queue();
      },
      { rootMargin: "25% 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    queue();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ ...style, willChange: "transform" }}>
      {children}
    </div>
  );
}
