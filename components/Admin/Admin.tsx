"use client";

import { useState } from "react";
import Category from "@/components/Admin/AddCategory";
import Product from "@/components/Admin/AddProductForm";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

export default function Admin() {
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gray-800 text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center lg:text-left">
          Admin Panel
        </h1>

        <nav className="flex flex-col sm:flex-row lg:flex-col gap-3">
          <button
            onClick={() => setSelected("category")}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 hover:bg-blue-700 transition"
          >
            Category
          </button>

          <button
            onClick={() => setSelected("product")}
            className="flex-1 rounded-lg bg-green-600 px-4 py-3 hover:bg-green-700 transition"
          >
            Product
          </button>
        </nav>

        <button
          onClick={() => setSelected("")}
          className="mt-6 w-full rounded-lg border border-gray-400 px-4 py-3 hover:bg-gray-700 transition"
        >
          ← Back to Home
        </button>
      </aside>

      {/* Main Content */}

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h2>

        {selected === "" && (
          <div className="rounded-xl bg-white p-6 shadow">
            Select an option from the sidebar.
          </div>
        )}

        {selected === "category" && <Category />}

        {selected === "product" && <Product />}
      </main>
    </div>
  );
}
