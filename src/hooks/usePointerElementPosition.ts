import { useContext, useEffect, useRef } from "react";
import { PointerContext } from "@/providers/PointerProvider";
export function usePointerElementPosition(id: string) {
  const context = useContext(PointerContext);
  if (!context)
    throw new Error(
      "usePointerElementPosition must be used within PointerProvider",
    );

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    context.registerElement(id, ref as React.RefObject<HTMLElement>);
    return () => context.unregisterElement(id);
  }, [id, context]);

  return ref;
}
