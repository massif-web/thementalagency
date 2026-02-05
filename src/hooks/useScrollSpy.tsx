"use client";
import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset = 0) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all currently intersecting sections
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: entry.target.id,
            ratio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
          }))
          .sort((a, b) => a.top - b.top); // Sort by position

        // Pick the topmost intersecting section
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].id);
        }
      },
      {
        rootMargin: `${-offset}px 0px -80% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for smoother tracking
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
