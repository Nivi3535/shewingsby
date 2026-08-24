"use client";

import { useEffect } from "react";
import { useProductStore } from "@/stores/productStore";
import ProductFilter from "@/components/Product/ProductFilter";
import ProductGrid from "../Product/ProductGrid";

//for my practise purpose i have this dashboard design want to try different design/ways /styling  but I have the same kinda implementation in
//the product
export default function Dashboard() {
  //product renamed to products
  const { product: products, loadProduct } = useProductStore();

  /*  const loadProducts = async () => {
    console.log("Before fetch");

    const res = await fetch("/api/product");

    console.log("After fetch");
  }; */
  useEffect(() => {
    console.log("Dashboard useEffect called");

    loadProduct();
  }, [loadProduct]);

  return (
    // <main className="mx-auto max-w-7xl px-6 py-8">
    //   <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

    //   <section className="flex gap-8">
    //     {/* Left Sidebar */}
    //     <ProductFilter />

    //     {/* Right Product Grid */}
    //     <div className="flex-1">
    //       <div className="grid grid-cols-3 gap-6">
    //         {products.map((product) => (
    //           <div
    //             key={product.id}
    //             className="rounded-lg border p-4 shadow-md transition hover:shadow-lg"
    //           >
    //             <img
    //               src={product.image?.[0]?.image ?? "/placeholder-product.png"}
    //               alt={product.name}
    //               className="mb-3 h-48 w-full rounded-md object-cover"
    //             />

    //             <h2 className="text-sm text-gray-500">
    //               {product.category.name}
    //             </h2>

    //             <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>

    //             <p className="mt-2 text-xl font-bold text-green-600">
    //               ₹{product.price}
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>
    // </main>
    <main className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <section className="flex gap-8">
        <ProductFilter />
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
