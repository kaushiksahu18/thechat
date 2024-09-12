"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { Provider } from "jotai";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SessionProvider>
        <Provider>{children}</Provider>
      </SessionProvider>
    </NextThemesProvider>
  );
}
