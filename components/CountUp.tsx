"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    return match ? `0${match[2]}` : value;
  });

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match) return;

    const [intPart, decPart] = match[1].split(".");
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = decPart ? decPart.length : 0;
    const pad = intPart.length;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1100;
        const start = performance.now();
        function tick(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const [curInt, curDec] = (target * eased).toFixed(decimals).split(".");
          const formatted = curDec
            ? `${curInt.padStart(pad, "0")}.${curDec}`
            : curInt.padStart(pad, "0");
          setDisplay(`${formatted}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
