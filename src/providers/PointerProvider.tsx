"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type PointerContextValue = {
  coordsRef: React.RefObject<{ x: number; y: number }>;
  registerElement: (id: string, ref: React.RefObject<HTMLElement>) => void;
  unregisterElement: (id: string) => void;
};

export const PointerContext = createContext<PointerContextValue | null>(null);

export function PointerProvider({ children }: { children: React.ReactNode }) {
  const coordsRef = useRef({ x: 0, y: 0 });
  const elementsRef = useRef<Map<string, React.RefObject<HTMLElement>>>(
    new Map(),
  );

  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number) => {
      coordsRef.current = { x: clientX, y: clientY };

      // Update registered elements
      elementsRef.current.forEach((ref) => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const isOver =
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom;

        element.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
        element.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
        element.style.setProperty("--alpha", isOver ? "1" : "0");
      });
    };

    const handleMouseMove = (e: MouseEvent) =>
      updatePointer(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const registerElement = (id: string, ref: React.RefObject<HTMLElement>) => {
    elementsRef.current.set(id, ref);
  };

  const unregisterElement = (id: string) => {
    elementsRef.current.delete(id);
  };

  return (
    <PointerContext.Provider
      value={{ coordsRef, registerElement, unregisterElement }}
    >
      {children}
    </PointerContext.Provider>
  );
}
