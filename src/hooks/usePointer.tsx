import { useContext } from "react";
import { PointerContext } from "@/providers/PointerProvider";

export function usePointer() {
  const context = useContext(PointerContext);
  if (!context)
    throw new Error("usePointer must be used within PointerProvider");

  return context.coordsRef;
}
