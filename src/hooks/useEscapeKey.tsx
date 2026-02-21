"use client";
import { useEffect } from "react";

export function useEscapeKey(callback: () => void, condition: boolean) {
  useEffect(() => {
    if (!condition) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [callback, condition]);
}
