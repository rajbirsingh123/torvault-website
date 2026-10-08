"use client";

import { useRef } from "react";
import { useElectricBorder, type ElectricAccent } from "./useElectricBorder";

type NeuralBorderProps = {
  accent?: ElectricAccent;
  /** Corner radius in CSS px, to match the host card's own border-radius. */
  radius?: number;
};

/**
 * Drop this in as the first child of a `position: relative; overflow: hidden`
 * card to trace its edge with the same live electric border NeuralButton
 * uses, without changing the card's own shape, padding, or content.
 */
export default function NeuralBorder({ accent = "gold", radius }: NeuralBorderProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useElectricBorder(hostRef, canvasRef, accent, radius);

  return (
    <div ref={hostRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <canvas
        aria-hidden="true"
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
