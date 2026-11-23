"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/stores/productStore";
import Product from "@/types/Product";
import AddProductForm from "./AddProductForm";

export default function AddProduct() {
  const { product, loadProduct, deleteProduct } = useProductStore();

  const [productList, setProductList] = useState<Product[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    setProductList(product);
  }, [product]);

  async function handleDelete(id: number) {
    setProductList((prev) => prev.filter((item, index) => item.id !== id));
    try {
      await deleteProduct(id);
    } catch {
      await loadProduct();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-md mx-auto space-y-6">
        {/* ---------------- Form ---------------- */}
        <AddProductForm />

        {/* ---------------- Product List ---------------- */}
        <div className="space-y-3">
          <h2 className="font-bold">Products</h2>

          {productList
            .filter(
              (item) =>
                new Date(item.createdAt).toDateString() ===
                new Date().toDateString(),
            )
            .map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-lg p-4 space-y-2"
              >
                <div className="flex flex-wrap gap-2">
                  {item.image?.map((img, index) => (
                    <img
                      key={index}
                      src={img.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-md object-cover"
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                  className="flex-1 border border-red-200 text-red-600 rounded-md py-2 text-sm hover:bg-red-50"
                >
                  Delete Product
                </button>

                <button
                  onClick={() => {
                    setExpandedId(item.id);
                  }}
                  className="flex-1 border border-red-200 text-red-600 rounded-md py-2 text-sm hover:bg-red-50"
                >
                  Expand Product
                </button>
                {expandedId === item.id && (
                  <div
                    key={item.id}
                    onMouseMove={() => setExpandedId(null)}
                    className="bg-white border rounded-lg p-4"
                  >
                    {" "}
                    <p>
                      <strong>Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong>Slug:</strong> {item.slug}
                    </p>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{item.price}
                    </p>
                    <p>
                      <strong>Stock:</strong> {item.stock}
                    </p>
                    <p>
                      <strong>Category:</strong> {item.category?.name} -{" "}
                      {item.category?.name}
                    </p>
                  </div>
                )}
              </div>
            ))}

          {productList.length === 0 && (
            <p className="text-gray-500 text-sm">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
