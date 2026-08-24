"use client";
import { useState } from "react";
import ProductToolbar from "./ProductToolbar";
import ProductGrid from "./ProductGrid";
import ArrowButton from "./ArrowButton";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import type { ProductsByCategory } from "@/lib/slugHelper/Product";

interface ProductSectionProps {
  categoryName: string;
  products: ProductsByCategory;
  count: number;
}

export default function ProductSection({
  categoryName,
  products,
  count,
}: ProductSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(count / 20); // Assuming 10 products per page

  const nextPage = () => {
    if (page === totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    console.log("next page", params);
    params.set("page", String(page + 1));
    setPage((prevPage) => prevPage + 1);
    router.push(`${pathname}?${params.toString()}`);
  };
  const previousPage = () => {
    if (page <= 1) return;
    console.log("previous page", page);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page - 1));
    setPage((prevPage) => prevPage - 1);
    router.push(`${pathname}?${params.toString()}`);
    // if (page == 1) return;
  };
  return (
    <section className="flex w-full flex-col gap-6">
      <h1>
        Products: {count} | Total Pages: {totalPages} | Current Page: {page}
      </h1>
      <ProductToolbar
        categoryName={categoryName}
        totalProducts={products.length}
      />

      <ProductGrid products={products} />
      <ArrowButton
        page={page}
        totalPages={totalPages}
        onPrevious={previousPage}
        onNext={nextPage}
      />
    </section>
  );
}
