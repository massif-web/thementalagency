"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/utilities/ui";

export function Float({
  children,
  className = "",
  intensity = 2,
  duration = [16, 36, 56],
}: {
  children: React.ReactNode;
  className?: string;
  /** Scale factor for movement range. 1 = subtle, 2 = dramatic */
  intensity?: number;
  /** Periods in seconds for [x, y, rotation]. Use primes for least repetition. */
  duration?: [number, number, number];
}) {
  const [isSafari, setIsSafari] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver({
    element: containerRef,
    threshold: 0.1,
  });

  useEffect(() => {
    const safari =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Macintosh") &&
        navigator.userAgent.includes("AppleWebKit") &&
        !navigator.userAgent.includes("Chrome"));
    setIsSafari(safari);
  }, []);

  if (isSafari) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        `animate-[float-x_var(--float-dx)_ease-in-out_infinite]`,
        !isVisible && `paused`,
        className,
      )}
      style={
        {
          "--float-dx": `${duration[0]}s`,
          "--float-dy": `${duration[1]}s`,
          "--float-dr": `${duration[2]}s`,
          "--float-range-x": `${16 * intensity}px`,
          "--float-range-y": `${12 * intensity}px`,
          "--float-range-r": `${2 * (intensity * 0.5)}deg`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "size-full animate-[float-y_var(--float-dy)_ease-in-out_infinite]",
          !isVisible && "paused",
        )}
      >
        <div
          className={cn(
            "size-full animate-[float-r_var(--float-dr)_ease-in-out_infinite]",
            !isVisible && "paused",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
