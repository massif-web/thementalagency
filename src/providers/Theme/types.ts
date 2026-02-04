export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void;
  theme?: Theme | null;
}

export function themeIsValid(string: null | string): string is Theme {
  return string ? ["dark", "light"].includes(string) : false;
}

export type Theme = "dark" | "light";

export const themeLocalStorageKey = "payload-theme";

export const defaultTheme = "light";
