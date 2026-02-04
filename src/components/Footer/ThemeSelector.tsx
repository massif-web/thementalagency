"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useTheme } from "@/providers/Theme/ThemeProvider";
import type { Theme } from "@/providers/Theme/types";
import { themeLocalStorageKey } from "@/providers/Theme/types";

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme();
  const [value, setValue] = useState("");

  const onThemeChange = (themeToSet: Theme & "auto") => {
    if (themeToSet === "auto") {
      setTheme(null);
      setValue("auto");
    } else {
      setTheme(themeToSet);
      setValue(themeToSet);
    }
  };

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey);
    setValue(preference ?? "auto");
  }, []);

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Select a theme"
        className="gap-2 bg-transparent pl-0 md:pl-3 border-none w-auto"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">Auto</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  );
};
