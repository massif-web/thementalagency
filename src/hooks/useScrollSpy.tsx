"use client";
import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset = 0, draft = false) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (draft) return; // Disable scroll spy in draft mode
      const scrollPosition = window.scrollY + offset + 1; // +1 to handle edge case at top

      // Find which section we're currently in
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const { top, bottom } = element.getBoundingClientRect();
        const elementTop = top + window.scrollY;
        const elementBottom = bottom + window.scrollY;

        // Check if scroll position is within this section
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          setActiveId(id);
          break;
        }
      }

      // Fallback: if at very top, activate first section
      if (window.scrollY === 0) {
        setActiveId(sectionIds[0]);
      }
    };

    handleScroll(); // Set initial state
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset, draft]);

  return activeId;
}
