"use client";
import { useEffect, useState } from "react";

export function useIntersectionObserver({
  element,
  threshold = 0.1,
}: {
  element: React.RefObject<HTMLElement | null>;
  threshold?: number;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold },
    );

    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      if (element.current) observer.unobserve(element.current);
    };
  }, [element, threshold]);

  return isIntersecting;
}
