"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utilities/ui";

export function Marquee({
  items,
  speed = 1,
  className,
  wrapperClassName,
  itemClassName,
  itemInnerClassName,
}: {
  items: string[] | React.ReactNode[];
  speed?: number;
  className?: string;
  wrapperClassName?: string;
  itemClassName?: string;
  itemInnerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  const calculateCopies = () => {
    const container = containerRef.current;
    const set = setRef.current;
    if (!container || !set) return;

    const containerWidth = container.getBoundingClientRect().width;
    const setWidth = set.getBoundingClientRect().width;

    if (setWidth === 0) return;

    // Need enough copies to fill the viewport + 1 extra for seamless looping
    const needed = Math.ceil(containerWidth / setWidth) + 1;
    setCopies(Math.max(2, needed));
  };

  useEffect(() => {
    const container = containerRef.current;
    const set = setRef.current;
    if (!container || !set) return;

    const ro = new ResizeObserver(calculateCopies);
    ro.observe(container);
    ro.observe(set);

    return () => ro.disconnect();
  });

  const itemNodes = items.map((item, index) => {
    const key = `marquee-item-${index}-${typeof item === "string" ? item : "node"}`;
    return (
      <span key={key} className={itemClassName}>
        <span className={itemInnerClassName}>{item}</span>
      </span>
    );
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative component:max-w-full component:overflow-x-clip whitespace-nowrap marquee-container",
        className,
      )}
    >
      <div
        style={
          {
            "--numItems": items.length,
            "--speed": `calc(var(--numItems) * ${1 / speed}s)`,
            "--translate": `${-100 / copies}%`,
          } as React.CSSProperties
        }
        className={cn(
          "relative component:flex component:items-center w-fit transform-gpu animate-marquee will-change-transform hover:paused",
        )}
      >
        {Array.from({ length: copies }, (_, i) => {
          const key = `marquee-node-${i}`;
          return (
            <div
              key={key}
              ref={i === 0 ? setRef : undefined}
              className={cn(
                "component:flex component:items-center",
                wrapperClassName,
              )}
            >
              {itemNodes}
            </div>
          );
        })}
      </div>
    </div>
  );
}
