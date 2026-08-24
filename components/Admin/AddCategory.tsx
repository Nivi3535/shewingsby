"use client";

import { useEffect, useState, useMemo } from "react";

interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

interface CategoryForm {
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState<CategoryForm>({
    name: "",
    slug: "",
    description: "",
    image: "",
    parentId: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategories(data);
  }

  function createSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const res = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        parentId: form.parentId || null,
      }),
    });

    if (res.ok) {
      alert("Category Created");

      setForm({
        name: "",
        slug: "",
        description: "",
        image: "",
        parentId: "",
      });

      loadCategories();
    }
  }
  const treeOptions = useMemo(() => {
    function buildTree(
      parentId: string | null = null,
      level = 0,
    ): React.ReactNode[] {
      return categories
        .filter((c) => c.parentId === parentId)
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
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
          className="border p-2 w-full bg-gray-100"
          value={form.slug}
          readOnly
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="Image URL"
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Category
        </button>
      </form>
    </div>
  );
}
