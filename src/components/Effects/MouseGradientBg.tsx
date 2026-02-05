"use client";
import { usePointerElementPosition } from "@/hooks/usePointerElementPosition";
import { cn } from "@/utilities/ui";
import styles from "./MouseGradientBg.module.css";

export function MouseGradientBg({
  children,
  id,
  opacity = 0.5,
  blendMode = "mix-blend-difference",
  size = "50vw",
  className = "",
  innerClassName = "",
  ...props
}: {
  children?: React.ReactNode;
  id: string;
  size?: string;
  blendMode?:
    | "mix-blend-normal"
    | "mix-blend-multiply"
    | "mix-blend-screen"
    | "mix-blend-overlay"
    | "mix-blend-darken"
    | "mix-blend-lighten"
    | "mix-blend-color-dodge"
    | "mix-blend-color-burn"
    | "mix-blend-hard-light"
    | "mix-blend-soft-light"
    | "mix-blend-difference"
    | "mix-blend-exclusion"
    | "mix-blend-hue"
    | "mix-blend-saturation"
    | "mix-blend-color"
    | "mix-blend-luminosity"
    | "mix-blend-plus-darker"
    | "mix-blend-plus-lighter";
  innerClassName?: string;
  opacity?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = usePointerElementPosition(id);

  return (
    <div {...props} className={cn(className, "size-full pointer-events-none")}>
      {children}
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(styles["gradient-card"], innerClassName || "", blendMode)}
        style={{ "--opacity": opacity, "--size": size } as React.CSSProperties}
      ></div>
    </div>
  );
}
