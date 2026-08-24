"use client";

import { useEffect, useState } from "react";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import Product from "@/types/Product";

export default function AddProduct() {
  const { categories, loadCategory } = useCategoryStore();

  const { product, loadProduct, saveProduct, deleteProduct, loading, error } =
    useProductStore();

  const [productList, setProductList] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("10");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    setProductList(product);
  }, [product]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...files]);
  }

  async function handleDelete(id: number) {
    setProductList((prev) => prev.filter((item, index) => item.id !== id));
    try {
      await deleteProduct(id);
    } catch {
      await loadProduct();
    }
  }

  function handleRemove(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("categoryId", categoryId);

    images.forEach((image) => {
      formData.append("images", image);
    });

    await saveProduct(formData);

    setName("");
    setSlug("");
    setDescription("");
    setPrice("");
    setStock("10");
    setCategoryId("");
    setImages([]);

    await loadProduct();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-md mx-auto space-y-6">
        {/* ---------------- Form ---------------- */}
        <form
          onSubmit={handleSubmit}
          className="bg-amber-200 rounded-xl shadow-sm border p-6 space-y-5"
        >
          <h1 className="text-2xl font-bold">Product Page</h1>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter slug"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Category</label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} - {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Product Images</label>

            <label
              htmlFor="images"
              className="inline-block cursor-pointer bg-blue-50 text-blue-700 border border-blue-200 rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-100"
            >
              + Choose Images
            </label>

            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div
                  key={`${image.name}-${index}`}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                >
                  <span className="truncate max-w-35">{image.name}</span>

                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="text-blue-500 hover:text-red-600 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Product"}
          </button>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>

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
