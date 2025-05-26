'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <Header />
        <main>{children}</main>
        <Footer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
