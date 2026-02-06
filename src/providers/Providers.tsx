import type React from "react";

import { PointerProvider } from "./PointerProvider";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <PointerProvider>{children}</PointerProvider>;
};
