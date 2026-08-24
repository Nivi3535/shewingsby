"use client";
import { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

export default function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <section className="border-b pb-5 last:border-b-0">
      <h3 className="mb-3 font-semibold">{title}</h3>

      {children}
    </section>
  );
}
