import type React from "react";

import { HeaderThemeProvider } from "./HeaderTheme";
import { PointerProvider } from "./PointerProvider";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <PointerProvider>
      <HeaderThemeProvider>{children}</HeaderThemeProvider>
    </PointerProvider>
  );
};
