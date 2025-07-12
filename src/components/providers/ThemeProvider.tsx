'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import MuiProvider from './MuiProvider';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <MuiProvider>
        {children}
      </MuiProvider>
    </NextThemeProvider>
  );
}