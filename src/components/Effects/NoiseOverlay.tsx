"use client";

import { useEffect, useId, useRef } from "react";

import grain0 from "@/assets/img/grain-0.webp";
import grain1 from "@/assets/img/grain-1.webp";
import grain2 from "@/assets/img/grain-2.webp";
import grain3 from "@/assets/img/grain-3.webp";
import grain4 from "@/assets/img/grain-4.webp";

const frames = [grain0, grain1, grain2, grain3, grain4];

type NoiseOverlayProps = {
  fps?: number;
  className?: string;
};

export const NoiseOverlay = ({ fps = 24, className }: NoiseOverlayProps) => {
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const id = useId();

  useEffect(() => {
    let current = 0;
    const layers = layersRef.current;

    const interval = setInterval(() => {
      const prev = current;
      current = (current + 1) % frames.length;
      if (layers[prev]) layers[prev].style.opacity = "0";
      const currentLayer = layers[current];
      if (currentLayer) currentLayer.style.opacity = "1";
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [fps]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className ?? ""}`}>
      {frames.map((frame, i) => {
        const key = `${id}-${i}`;
        return (
          <div
            key={key}
            ref={(el) => {
              layersRef.current[i] = el;
            }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${frame.src})`,
              backgroundRepeat: "repeat",
              opacity: i === 0 ? 1 : 0,
            }}
          />
        );
      })}
    </div>
  );
};
