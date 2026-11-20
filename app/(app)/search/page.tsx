import { Suspense } from "react";
import ProductSection from "@/components/Product/ProductSection";
import ProductFilter from "@/components/Product/ProductFilter";
import prisma from "@/lib/prisma";
import Product from "@/types/Product";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";

  let products: Product[] = [];
  let count = 0;

  if (query.trim().length > 0) {
    // Search products by name or description
    products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      include: {
        image: true,
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    count = products.length;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mt-2">
          {count} product{count !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="w-72 shrink-0">
          <ProductFilter />
        </aside>

        <section className="flex-1">
          <ProductSection
            categoryName={`Search: ${query}`}
            products={products}
            count={count}
          />
        </section>
      </div>
    </main>
  );
}
