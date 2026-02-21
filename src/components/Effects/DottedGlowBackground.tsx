"use client";

import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

type DottedGlowBackgroundProps = {
  className?: string;
  gap?: number;
  radius?: number;
  color?: string;
  darkColor?: string;
  glowColor?: string;
  darkGlowColor?: string;
  colorLightVar?: string;
  colorDarkVar?: string;
  glowColorLightVar?: string;
  glowColorDarkVar?: string;
  opacity?: number;
  backgroundOpacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
};

// ── helpers ──────────────────────────────────────────────────────────

const resolveCssVar = (el: Element, name?: string): string | null => {
  if (!name) return null;
  const key = name.startsWith("--") ? name : `--${name}`;
  const v = getComputedStyle(el).getPropertyValue(key).trim();
  if (v) return v;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(key).trim() ||
    null
  );
};

/** Parse any CSS color to an {r,g,b} object (returns null on failure). */
const parseColor = (
  raw: string,
): { r: number; g: number; b: number } | null => {
  // Try rgb(a) / plain hex first without DOM
  const rgbMatch = raw.match(
    /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,/\s]+[\d.]+%?)?\s*\)/,
  );
  if (rgbMatch) return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };

  // Hex
  const hexMatch = raw.match(/^#?([\da-f]{3,8})$/i);
  if (hexMatch) {
    let h = hexMatch[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }

  // Fallback: offscreen canvas to let browser parse named colors etc.
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const cx = c.getContext("2d");
    if (!cx) return null;
    cx.fillStyle = raw;
    cx.fillRect(0, 0, 1, 1);
    const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
    return { r, g, b };
  } catch {
    return null;
  }
};

// ── component ────────────────────────────────────────────────────────

export const DottedGlowBackground = ({
  className,
  gap = 12,
  radius = 2,
  color = "rgba(0,0,0,0.7)",
  darkColor,
  glowColor = "rgba(0, 170, 255, 0.85)",
  darkGlowColor,
  colorLightVar,
  colorDarkVar,
  glowColorLightVar,
  glowColorDarkVar,
  opacity = 0.6,
  backgroundOpacity = 0,
  speedMin = 0.4,
  speedMax = 1.3,
  speedScale = 1,
}: DottedGlowBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Stable refs so the animation loop never needs to restart for color changes
  const colorsRef = useRef({ dot: color, glow: glowColor });

  const isVisible = useIntersectionObserver({
    element: containerRef,
    threshold: 0.1,
  });

  // ── resolve theme colors (no state, just mutate ref) ──
  useEffect(() => {
    const container = containerRef.current ?? document.documentElement;

    const compute = () => {
      const isDark = true; // keeping your original logic
      let nextColor = color;
      let nextGlow = glowColor;

      if (isDark) {
        nextColor =
          resolveCssVar(container, colorDarkVar) || darkColor || nextColor;
        nextGlow =
          resolveCssVar(container, glowColorDarkVar) ||
          darkGlowColor ||
          nextGlow;
      } else {
        nextColor = resolveCssVar(container, colorLightVar) || nextColor;
        nextGlow = resolveCssVar(container, glowColorLightVar) || nextGlow;
      }

      colorsRef.current = { dot: nextColor, glow: nextGlow };
    };

    compute();

    const mo = new MutationObserver(compute);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    return () => mo.disconnect();
  }, [
    color,
    darkColor,
    glowColor,
    darkGlowColor,
    colorLightVar,
    colorDarkVar,
    glowColorLightVar,
    glowColorDarkVar,
  ]);

  // ── main animation loop (single stable effect) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx || !isVisible) return;

    let raf = 0;
    let stopped = false;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    // ── dots grid ──
    type Dot = { x: number; y: number; phase: number; speed: number };
    let dots: Dot[] = [];
    const sMin = Math.min(speedMin, speedMax);
    const sMax = Math.max(speedMin, speedMax);
    const sSpan = Math.max(sMax - sMin, 0);

    const regenDots = () => {
      const { width, height } = container.getBoundingClientRect();
      const cols = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;
      const next: Dot[] = new Array(cols * rows);
      let idx = 0;
      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          next[idx++] = {
            x: i * gap + (j % 2 === 0 ? 0 : gap * 0.5),
            y: j * gap,
            phase: Math.random() * Math.PI * 2,
            speed: sMin + Math.random() * sSpan,
          };
        }
      }
      dots = next;
    };

    // ── sizing ──
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(width * dpr));
      const h = Math.max(1, Math.floor(height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = `${Math.floor(width)}px`;
        canvas.style.height = `${Math.floor(height)}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    // Debounced resize + regen
    let resizeTimer = 0;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        regenDots();
      }, 120);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    resize();
    regenDots();

    // ── pre-build glow sprite (offscreen canvas) ──
    // A soft radial blob baked once, drawn via drawImage — way cheaper than shadowBlur.
    const glowSize = Math.ceil((radius * 3 + 8) * 2);
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = glowCanvas.height = Math.ceil(glowSize * dpr);
    const glowCtx = glowCanvas.getContext("2d");
    let glowReady = false;

    const rebuildGlowSprite = () => {
      if (!glowCtx) return;
      const parsed = parseColor(colorsRef.current.glow);
      if (!parsed) return;
      const { r, g, b } = parsed;
      const s = glowSize * dpr;
      const half = s / 2;
      glowCtx.clearRect(0, 0, s, s);
      const grad = glowCtx.createRadialGradient(
        half,
        half,
        0,
        half,
        half,
        half,
      );
      grad.addColorStop(0, `rgba(${r},${g},${b},0.55)`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b},0.18)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      glowCtx.fillStyle = grad;
      glowCtx.fillRect(0, 0, s, s);
      glowReady = true;
    };
    rebuildGlowSprite();

    // Rebuild glow sprite periodically to pick up color changes (cheap, ~1ms)
    let lastGlowColor = colorsRef.current.glow;

    // ── draw ──
    const draw = (now: number) => {
      if (stopped) return;

      // Lazily rebuild glow sprite if color ref changed
      if (colorsRef.current.glow !== lastGlowColor) {
        lastGlowColor = colorsRef.current.glow;
        rebuildGlowSprite();
      }

      const { width, height } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width / dpr, height + gap);

      // optional background fade
      if (backgroundOpacity > 0) {
        ctx.globalAlpha = 1;
        const grad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.4,
          Math.min(width, height) * 0.1,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.7,
        );
        grad.addColorStop(0, "rgba(19,19,19,0)");
        grad.addColorStop(
          1,
          `rgba(19,19,19,${Math.min(Math.max(backgroundOpacity, 0), 1)})`,
        );
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Resolve dot color once per frame
      ctx.fillStyle = colorsRef.current.dot;
      // No shadowBlur at all — the glow sprite handles it

      const time = (now / 1000) * Math.max(speedScale, 0);
      const len = dots.length;
      const glowHalf = glowSize / 2;

      // ── Pass 1: draw glow sprites for bright dots ──
      if (glowReady) {
        for (let i = 0; i < len; i++) {
          const d = dots[i];
          const mod = (time * d.speed + d.phase) % 2;
          const lin = mod < 1 ? mod : 2 - mod;
          const a = 0.25 + 0.55 * lin;
          if (a > 0.6) {
            const glow = (a - 0.6) / 0.4;
            ctx.globalAlpha = glow * opacity * 0.7;
            ctx.drawImage(
              glowCanvas,
              d.x - glowHalf,
              d.y - glowHalf,
              glowSize,
              glowSize,
            );
          }
        }
      }

      // ── Pass 2: draw dot rects batched by alpha bucket ──
      // Using ~8 buckets to minimise globalAlpha state changes
      const BUCKETS = 8;
      for (let b = 0; b < BUCKETS; b++) {
        const bucketAlpha = (0.25 + (0.55 * (b + 0.5)) / BUCKETS) * opacity;
        ctx.globalAlpha = bucketAlpha;

        for (let i = 0; i < len; i++) {
          const d = dots[i];
          const mod = (time * d.speed + d.phase) % 2;
          const lin = mod < 1 ? mod : 2 - mod;
          // Which bucket does this dot fall into?
          const bucket = (lin * BUCKETS) | 0; // floor
          if (bucket !== b) continue;

          const sizeMod = (time * d.speed + d.phase + 1.5) % 2;
          const sizeLin = sizeMod < 1 ? sizeMod : 2 - sizeMod;
          const r = radius * (0.5 + 0.5 * sizeLin);

          ctx.fillRect(d.x - r, d.y - r, r * 2, r * 2);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", handleResize);
    raf = requestAnimationFrame(draw);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
    };
  }, [
    gap,
    radius,
    opacity,
    backgroundOpacity,
    speedMin,
    speedMax,
    speedScale,
    isVisible,
  ]);

  return (
    <div
      ref={containerRef}
      data-name="dotted-glow-background"
      className={className}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
};
