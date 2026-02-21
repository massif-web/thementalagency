"use client";

import { useEffect, useRef, useState } from "react";

type FloatingDotsBackgroundProps = {
  className?: string;
  /** number of dots to render */
  dotCount?: number;
  /** base radius of each dot in CSS px */
  radius?: number;
  /** whether the dots should be perfectly round */
  round?: boolean;
  /** dot color */
  color?: string;
  /** optional dot color for dark mode */
  darkColor?: string;
  /** optional CSS variable name for light dot color */
  colorLightVar?: string;
  /** optional CSS variable name for dark dot color */
  colorDarkVar?: string;
  /** global opacity for the whole layer */
  opacity?: number;
  /** minimum upward speed in px/s */
  speedMin?: number;
  /** maximum upward speed in px/s */
  speedMax?: number;
  /** horizontal drift range in px/s */
  driftRange?: number;
  /** fraction of the canvas height where dots start fading out (0–1, from top) */
  fadeZone?: number;
  /** whether dots should fade out */
  fade?: boolean;
};

const resolveCssVariable = (
  el: Element,
  variableName?: string,
): string | null => {
  if (!variableName) return null;
  const normalized = variableName.startsWith("--")
    ? variableName
    : `--${variableName}`;
  const fromEl = getComputedStyle(el).getPropertyValue(normalized).trim();
  if (fromEl) return fromEl;
  const root = document.documentElement;
  return getComputedStyle(root).getPropertyValue(normalized).trim() || null;
};

const randomLifetime = () => Math.random() * 0.1; // each dot also has a random "lifetime" that makes it fade out as it approaches the top, for more visual interest

export const FloatingDotsBackground = ({
  className,
  dotCount = 50,
  radius = 3,
  round = false,
  color = "rgba(255,255,255,0.7)",
  darkColor,
  colorLightVar,
  colorDarkVar,
  opacity = 1.0,
  speedMin = 30,
  speedMax = 80,
  driftRange = 20,
  fadeZone = 1,
  fade = false,
}: FloatingDotsBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [resolvedColor, setResolvedColor] = useState<string>(color);

  // ---- resolve color from CSS vars / dark mode ----
  useEffect(() => {
    const container = containerRef.current ?? document.documentElement;

    const compute = () => {
      const isDark = document.documentElement.classList.contains("dark");
      let nextColor = color;

      if (isDark) {
        const varDot = resolveCssVariable(container, colorDarkVar);
        nextColor = varDot || darkColor || nextColor;
      } else {
        const varDot = resolveCssVariable(container, colorLightVar);
        nextColor = varDot || nextColor;
      }

      setResolvedColor(nextColor);
    };

    compute();

    const mo = new MutationObserver(compute);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => mo.disconnect();
  }, [color, darkColor, colorLightVar, colorDarkVar]);

  // ---- canvas animation ----
  useEffect(() => {
    const el = canvasRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stopped = false;
    let lastTime = performance.now();

    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      el.width = Math.max(1, Math.floor(width * dpr));
      el.height = Math.max(1, Math.floor(height * dpr));
      el.style.width = `${Math.floor(width)}px`;
      el.style.height = `${Math.floor(height)}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    // ---- dot type & helpers ----
    type Dot = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      vlife: number;
    };

    const randomSpeed = () =>
      -(speedMin + Math.random() * (speedMax - speedMin));

    const randomDrift = () => (Math.random() - 0.5) * driftRange * 2;

    const randomRadius = () => radius * (0.5 + Math.random() * 0.5); // add some random size variation for visual interest

    /** Reset a dot to a random position at the bottom edge */
    const resetDot = (d: Dot) => {
      const { width, height } = container.getBoundingClientRect();
      d.x = Math.random() * width;
      d.r = randomRadius();
      d.y = height + d.r * 2;
      d.vx = randomDrift();
      d.vy = randomSpeed();
      d.vlife = randomLifetime();
    };

    // ---- initial population spread across the full canvas ----
    const dots: Dot[] = [];
    {
      const { width, height } = container.getBoundingClientRect();
      for (let i = 0; i < dotCount; i++) {
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: randomRadius(),
          vx: randomDrift(),
          vy: randomSpeed(),
          vlife: randomLifetime(),
        });
      }
    }

    // ---- draw loop ----
    const draw = (now: number) => {
      if (stopped) return;

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const { width, height } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // The top portion of the canvas where dots fade out
      const fadeStart = height * fadeZone; // e.g. top 30%

      ctx.fillStyle = resolvedColor;

      for (const d of dots) {
        // Update position
        d.x += d.vx * dt;
        d.y += d.vy * dt;

        // Optional shrink dot to almost 0 as dot approaches top
        const currentRadius =
          d.y < fadeStart ? Math.max(0, d.r * (d.y / fadeStart)) : d.r;

        // Recycle if off-screen top or sides
        if (
          d.y < -currentRadius * 2 ||
          d.x < -currentRadius * 4 ||
          d.x > width + currentRadius * 4
        ) {
          resetDot(d);
          continue;
        }

        // Compute fade: fully opaque below fadeStart, fading to 0 at y=0
        let alpha = opacity;
        if (fade && d.y < fadeStart) {
          alpha *= d.y / fadeStart;
          alpha = Math.max(0, alpha - d.vlife); // also fade out based on dot's lifetime
        }

        ctx.globalAlpha = alpha;
        if (round) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(
            d.x - currentRadius,
            d.y - currentRadius,
            currentRadius * 2,
            currentRadius * 2,
          );
        }
      }

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, [
    dotCount,
    radius,
    round,
    resolvedColor,
    opacity,
    speedMin,
    speedMax,
    driftRange,
    fadeZone,
    fade,
  ]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
};
