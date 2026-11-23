"use client";

import { useActionState, useEffect, useState } from "react";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";
import { postProduct } from "@/lib/Helper/product";
import SubmitButton from "@/components/common/SubmitButton";

//interface type for the form
type FormValues = {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
};

type FormState = {
  error: string;
  success: string;
  //what the user typed, so the form refills after an error (React resets the form after every action)
  values: FormValues;
};

//initial values
const emptyValues: FormValues = {
  name: "",
  slug: "",
  description: "",
  price: "",
  stock: "10",
  categoryId: "",
};

const initialState: FormState = { error: "", success: "", values: emptyValues };

const inputClass =
  "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function AddProductForm() {
  const { categories, loadCategory } = useCategoryStore();
  const { loadProduct } = useProductStore();

  //i have state for image so controlled input onChange can be done by REAct
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  //formstate - error, success and values(previousvalues) and formData current form value
  async function addProductAction(
    prevState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const values = Object.fromEntries(
      Object.keys(emptyValues).map((key) => [
        key,
        String(formData.get(key) ?? ""),
      ]),
    ) as FormValues;

    //validation
    if (!values.name.trim()) {
      return { error: "Name is required", success: "", values };
    }
    if (Number(values.price) <= 0) {
      return { error: "Price must be greater than 0", success: "", values };
    }
    if (!values.categoryId) {
      return { error: "Please select a category", success: "", values };
    }

    images.forEach((image) => formData.append("images", image));

    try {
      const product = await postProduct(formData);
      setImages([]);
      await loadProduct();
      return {
        error: "",
        success: `"${product.name}" added`,
        values: emptyValues,
      };
    } catch {
      return { error: "Failed to save product", success: "", values };
    }
  }

  const [state, runAction] = useActionState(addProductAction, initialState);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...files]);
    e.target.value = ""; //lets the user pick the same file again
  }

  function handleRemove(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form
      action={runAction}
      className="bg-amber-200 rounded-xl shadow-sm border p-6 space-y-5"
    >
      <h1 className="text-2xl font-bold">Product Page</h1>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Product Name</label>
        <input
          name="name"
          defaultValue={state.values.name}
          placeholder="Enter product name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Slug</label>
        <input
          name="slug"
          defaultValue={state.values.slug}
          placeholder="Enter slug"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={state.values.description}
          placeholder="Enter description"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Price</label>
        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={state.values.price}
          placeholder="Enter price"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Stock</label>
        <input
          name="stock"
          type="number"
          defaultValue={state.values.stock}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Category</label>
        <select
          name="categoryId"
          defaultValue={state.values.categoryId}
          className={inputClass}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
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

        {/* no name, so FormData skips it - images are appended from state instead */}
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

      <SubmitButton>Add Product</SubmitButton>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-green-600">{state.success}</p>
      )}
    </form>
  );
}
