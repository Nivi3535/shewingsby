"use client";
import toast from "react-hot-toast";

import { useEffect, useState, useMemo } from "react";
import { useCategoryStore } from "@/stores/categoryStore";
import ViewCategory from "./ViewCategory";

//In the product page
//I have addproductform originally thats the form where i can upload the image and used
//AddProduct just for display purpose

//Here in category I have AddCategory where category form is implemented where i can upload images a
//and used viewcategory.tsx to dispay the category added below the add category 0 zustand source of truth not state here

//I need to follow commaon pattern - todo after te run
interface CategoryForm {
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
}

export default function CategoryPage() {
  // const [categories, setCategories] = useState<Category[]>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null); //deletion purpose
  const categories = useCategoryStore((state) => state.categories);
  const loadCategory = useCategoryStore((state) => state.loadCategory);
  const saveCategory = useCategoryStore((state) => state.saveCategory);
  const deleteCategory = useCategoryStore((state) => state.deleteCategory);
  const error = useCategoryStore((state) => state.error);
  const loading = useCategoryStore((state) => state.loading);

  //trying to do load category and list them down also provide to delete it

  const [form, setForm] = useState<CategoryForm>({
    name: "",
    slug: "",
    description: "",
    image: "",
    parentId: "",
  });

  function createSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  async function handleSubmit(formdata: FormData) {
    const res = await saveCategory(formdata);

    if (!res) {
      toast.error(
        useCategoryStore.getState().error ?? "Failed to save category",
      );

      return; // stop here, so the form keeps what the user typed
    }

    toast.success("Category created");
    setForm({
      name: "",
      slug: "",
      description: "",
      image: "",
      parentId: "",
    });
    //i dont need to call loadcategory here react will rerender -> useeffect-> call loadcategry
    //loadCategory();
  }

  function handleDelete() {
    if (selectedId === null) return;

    deleteCategory(selectedId);
    setSelectedId(null);
  }

  const treeOptions = useMemo(() => {
    function buildTree(
      parentId: string | null = null,
      level = 0,
    ): React.ReactNode[] {
      // 1. Find the categories that belong under this parent.
      //const matchingCategories = categories.filter(
      //  (category) => category.parentId === parentId,
      //);

      return categories
        .filter((c) => (c.parentId ?? null) === parentId)
        .flatMap((category) => [
          <option key={category.id} value={category.id}>
            {"— ".repeat(level)}
            {category.name}
          </option>,
          ...buildTree(category.id, level + 1),
        ]);
    }
    return buildTree();
  }, [categories]);

  return (
    <div className="max-w-xl mx-auto mt-10">
      {/* //removed onsubmit and added action, so formData is readily available so
      //no need const formData = new FormData(event.curre */}
      <form action={handleSubmit} className="space-y-4">
        <input
          name="name"
          className="border p-2 w-full"
          placeholder="Category Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
              slug: createSlug(e.target.value),
            })
          }
        />
        <input
          name="slug"
          className="border p-2 w-full bg-gray-100"
          value={form.slug}
          readOnly
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          name="description"
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />
        {/* optional: a path inside /public, e.g. /images/pattu-gown.png
            (outside URLs also need images.remotePatterns in next.config.ts for next/image) */}
        <input
          name="image"
          className="border p-2 w-full"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value,
            })
          }
        />
        <select
          className="border p-2 w-full"
          value={form.parentId}
          name="parentId"
          onChange={(e) =>
            setForm({
              ...form,
              parentId: e.target.value,
            })
          }
        >
          <option value="">Top Level Category</option>

          {treeOptions}
        </select>

        {/* error from the store, e.g. "Name and slug are required" */}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* disabled while saving, so a double-click can't save twice */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Category"}
        </button>
      </form>

      <section>
        <ViewCategory selectedId={selectedId} onSelect={setSelectedId} />

        <button
          type="button"
          disabled={selectedId === null}
          onClick={handleDelete}
        >
          Delete selected category
        </button>
      </section>
    </div>
  );
}
