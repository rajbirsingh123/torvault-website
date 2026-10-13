"use client";

import { Link } from "@/i18n/navigation";
import { useRef } from "react";
import type { ReactNode } from "react";
import { useElectricBorder, type ElectricAccent } from "./useElectricBorder";

type NeuralButtonProps = {
  href?: string;
  children: ReactNode;
  accent?: ElectricAccent;
  className?: string;
};

/**
 * Pill button (or non-link badge, when `href` is omitted) with a live canvas
 * border — see useElectricBorder for the animation itself.
 */
export default function NeuralButton({
  href,
  children,
  accent = "gold",
  className = "",
}: NeuralButtonProps) {
  const hostRef = useRef<HTMLAnchorElement & HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useElectricBorder(hostRef, canvasRef, accent);

  const combinedClassName = `neural-btn neural-btn-${accent} ${className}`;

  if (!href) {
    return (
      <div ref={hostRef} className={combinedClassName}>
        <canvas aria-hidden="true" ref={canvasRef} />
        <span className="neural-btn-label">{children}</span>
      </div>
    );
  }

  return (
    <Link href={href} ref={hostRef} className={combinedClassName}>
      <canvas aria-hidden="true" ref={canvasRef} />
      <span className="neural-btn-label">{children}</span>
    </Link>
  );
}
