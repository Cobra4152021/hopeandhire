'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type PropsWithChildren } from 'react';

export function ThemeProvider({ children, ...props }: PropsWithChildren<{ [key: string]: any }>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
