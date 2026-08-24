// app/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import FilterProvider from "@/components/Product/Filter/FilterContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <FilterProvider>{children}</FilterProvider>
    </SessionProvider>
  );
}
