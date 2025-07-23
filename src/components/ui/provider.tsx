// "use client"

// import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
// import {
//   ColorModeProvider,
//   type ColorModeProviderProps,
// } from "./color-mode"

// export function Provider(props: ColorModeProviderProps) {
//   return (
//     <ChakraProvider value={defaultSystem}>
//       <ColorModeProvider {...props} />
//     </ChakraProvider>
//   )
// }
"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

// Create theme context
interface ThemeContextType {
  colorMode: "light" | "dark" | "system";
  setColorMode: (mode: "light" | "dark" | "system") => void;
  themeMode: "teen" | "university";
  setThemeMode: (mode: "teen" | "university") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a Provider");
  }
  return context;
}

export function Provider({ children, ...props }: ThemeProviderProps) {
  const [colorMode, setColorMode] = useState<"light" | "dark" | "system">("light");
  const [themeMode, setThemeMode] = useState<"teen" | "university">("teen");

  // Apply theme mode CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const mode = themeMode;
    
    root.style.setProperty("--primary", `var(--${mode}-primary)`);
    root.style.setProperty("--secondary", `var(--${mode}-secondary)`);
    root.style.setProperty("--accent", `var(--${mode}-accent)`);
    root.style.setProperty("--background", `var(--${mode}-background)`);
    root.style.setProperty("--surface", `var(--${mode}-surface)`);
    root.style.setProperty("--text", `var(--${mode}-text)`);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode, themeMode, setThemeMode }}>
      <NextThemesProvider 
        attribute="class" 
        disableTransitionOnChange
        defaultTheme={colorMode}
        {...props}
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
}